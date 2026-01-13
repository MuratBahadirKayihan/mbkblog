---
layout: post
title: "Kotlin ve Firebase ile Real-time Chat Uygulaması"
date: "2025-12-27"
categories: mobile android kotlin firebase real-time-database
description: "Kotlin ve Firebase kullanarak modern bir real-time chat uygulaması nasıl geliştirilir? Adım adım rehber."
author: Murat Bahadır KAYIHAN
tags:
  - Mobile
  - Android
  - Kotlin
  - Firebase
  - Real-time Database
---

Modern bir Android mesajlaşma uygulaması geliştirmek istiyorsanız, doğru yerdesiniz! Bu yazıda Kotlin ve Firebase kullanarak gerçek zamanlı bir mesajlaşma uygulaması geliştireceğiz. Material Design 3, MVVM mimarisi ve Jetpack Compose kullanarak modern ve ölçeklenebilir bir uygulama ortaya çıkaracağız.

## Neler Öğreneceğiz?

- Jetpack Compose ile modern UI geliştirme
- Firebase Authentication ile kullanıcı yönetimi
- Firebase Realtime Database ile gerçek zamanlı mesajlaşma
- Firebase Cloud Storage ile medya paylaşımı
- MVVM mimarisi ve Clean Architecture
- Dependency Injection (Hilt)
- Coroutines ve Flow
- Push Notifications

## Proje Yapısı

```
chat-app/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/mbkayihan/chatapp/
│   │   │   │   ├── MainActivity.kt
│   │   │   │   ├── ChatApplication.kt
│   │   │   │   ├── di/
│   │   │   │   ├── domain/
│   │   │   │   ├── data/
│   │   │   │   ├── presentation/
│   │   │   │   └── utils/
│   │   │   └── res/
│   │   └── test/
│   └── build.gradle
└── build.gradle
```

## Gerekli Bağımlılıklar

```kotlin
// app/build.gradle.kts
dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.compose.ui:ui:1.5.4")
    implementation("androidx.compose.material3:material3:1.1.2")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.6.2")
    implementation("androidx.navigation:navigation-compose:2.7.5")
    
    // Firebase
    implementation(platform("com.google.firebase:firebase-bom:32.7.0"))
    implementation("com.google.firebase:firebase-auth-ktx")
    implementation("com.google.firebase:firebase-database-ktx")
    implementation("com.google.firebase:firebase-storage-ktx")
    implementation("com.google.firebase:firebase-messaging-ktx")
    
    // Dependency Injection
    implementation("com.google.dagger:hilt-android:2.48")
    kapt("com.google.dagger:hilt-compiler:2.48")
    
    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-play-services:1.7.3")
}
```

## Firebase Kurulumu

1. Firebase Console'dan yeni bir proje oluşturun
2. Android uygulamanızı kaydedin
3. `google-services.json` dosyasını indirip `app/` dizinine ekleyin
4. Authentication, Realtime Database ve Storage servislerini aktifleştirin

## Veri Modelleri

```kotlin
data class User(
    val id: String = "",
    val name: String = "",
    val email: String = "",
    val photoUrl: String = "",
    val status: String = "offline"
)

data class Message(
    val id: String = "",
    val senderId: String = "",
    val receiverId: String = "",
    val content: String = "",
    val timestamp: Long = System.currentTimeMillis(),
    val type: MessageType = MessageType.TEXT,
    val mediaUrl: String = ""
)

enum class MessageType {
    TEXT, IMAGE, FILE
}
```

## Repository Katmanı

```kotlin
interface ChatRepository {
    suspend fun sendMessage(message: Message): Result<Unit>
    fun getMessages(chatId: String): Flow<List<Message>>
    suspend fun uploadMedia(uri: Uri): Result<String>
    fun getUserPresence(userId: String): Flow<Boolean>
    suspend fun updateUserStatus(status: String): Result<Unit>
}

class ChatRepositoryImpl @Inject constructor(
    private val database: FirebaseDatabase,
    private val storage: FirebaseStorage,
    private val auth: FirebaseAuth
) : ChatRepository {
    
    override suspend fun sendMessage(message: Message): Result<Unit> = try {
        val chatRef = database.getReference("chats")
            .child(getChatId(message.senderId, message.receiverId))
            
        chatRef.push().setValue(message).await()
        Result.success(Unit)
    } catch (e: Exception) {
        Result.failure(e)
    }
    
    override fun getMessages(chatId: String): Flow<List<Message>> = callbackFlow {
        val messagesRef = database.getReference("chats").child(chatId)
        
        val listener = messagesRef.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val messages = snapshot.children.mapNotNull { 
                    it.getValue<Message>() 
                }
                trySend(messages)
            }
            
            override fun onCancelled(error: DatabaseError) {
                close(error.toException())
            }
        })
        
        awaitClose { messagesRef.removeEventListener(listener) }
    }
    
    private fun getChatId(userId1: String, userId2: String): String {
        return if (userId1 < userId2) "$userId1-$userId2" else "$userId2-$userId1"
    }
}
```

## ViewModel

```kotlin
@HiltViewModel
class ChatViewModel @Inject constructor(
    private val repository: ChatRepository,
    private val auth: FirebaseAuth
) : ViewModel() {

    private val _messages = MutableStateFlow<List<Message>>(emptyList())
    val messages: StateFlow<List<Message>> = _messages.asStateFlow()

    private val _uiState = MutableStateFlow<ChatUiState>(ChatUiState.Initial)
    val uiState: StateFlow<ChatUiState> = _uiState.asStateFlow()

    fun loadMessages(receiverId: String) {
        viewModelScope.launch {
            repository.getMessages(getChatId(auth.uid!!, receiverId))
                .catch { error ->
                    _uiState.value = ChatUiState.Error(error.message)
                }
                .collect { messageList ->
                    _messages.value = messageList
                    _uiState.value = ChatUiState.Success
                }
        }
    }

    fun sendMessage(content: String, receiverId: String) {
        viewModelScope.launch {
            val message = Message(
                senderId = auth.uid!!,
                receiverId = receiverId,
                content = content
            )
            
            repository.sendMessage(message)
                .onSuccess {
                    _uiState.value = ChatUiState.MessageSent
                }
                .onFailure { error ->
                    _uiState.value = ChatUiState.Error(error.message)
                }
        }
    }
}

sealed class ChatUiState {
    object Initial : ChatUiState()
    object Success : ChatUiState()
    object MessageSent : ChatUiState()
    data class Error(val message: String?) : ChatUiState()
}
```

## UI Katmanı (Jetpack Compose)

```kotlin
@Composable
fun ChatScreen(
    viewModel: ChatViewModel = hiltViewModel(),
    receiverId: String
) {
    val messages by viewModel.messages.collectAsState()
    val uiState by viewModel.uiState.collectAsState()
    
    LaunchedEffect(Unit) {
        viewModel.loadMessages(receiverId)
    }
    
    Scaffold(
        topBar = {
            ChatTopBar(receiverName = "John Doe") // Gerçek kullanıcı adını alın
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // Mesaj Listesi
            LazyColumn(
                modifier = Modifier.weight(1f),
                reverseLayout = true
            ) {
                items(messages) { message ->
                    MessageItem(message)
                }
            }
            
            // Mesaj Gönderme Alanı
            MessageInput(
                onSendMessage = { content ->
                    viewModel.sendMessage(content, receiverId)
                }
            )
        }
    }
}

@Composable
fun MessageItem(message: Message) {
    val isOutgoing = message.senderId == FirebaseAuth.getInstance().uid
    
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        horizontalArrangement = if (isOutgoing) 
            Arrangement.End else Arrangement.Start
    ) {
        Surface(
            shape = MaterialTheme.shapes.medium,
            color = if (isOutgoing) 
                MaterialTheme.colorScheme.primary 
            else 
                MaterialTheme.colorScheme.surface,
            tonalElevation = 2.dp
        ) {
            Column(modifier = Modifier.padding(12.dp)) {
                Text(
                    text = message.content,
                    style = MaterialTheme.typography.bodyLarge
                )
                Text(
                    text = formatTimestamp(message.timestamp),
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.align(Alignment.End)
                )
            }
        }
    }
}

@Composable
fun MessageInput(
    onSendMessage: (String) -> Unit
) {
    var text by remember { mutableStateOf("") }
    
    Surface(
        tonalElevation = 3.dp,
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            TextField(
                value = text,
                onValueChange = { text = it },
                modifier = Modifier.weight(1f),
                placeholder = { Text("Mesajınızı yazın...") },
                colors = TextFieldDefaults.colors(
                    unfocusedContainerColor = MaterialTheme.colorScheme.surface
                )
            )
            
            Spacer(modifier = Modifier.width(8.dp))
            
            IconButton(
                onClick = {
                    if (text.isNotBlank()) {
                        onSendMessage(text)
                        text = ""
                    }
                }
            ) {
                Icon(
                    imageVector = Icons.Default.Send,
                    contentDescription = "Gönder"
                )
            }
        }
    }
}
```

## Push Notifications

Firebase Cloud Messaging ile bildirim gönderme:

```kotlin
class MessagingService : FirebaseMessagingService() {
    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)
        
        // Bildirim oluştur
        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle(message.data["title"])
            .setContentText(message.data["body"])
            .setSmallIcon(R.drawable.ic_notification)
            .setAutoCancel(true)
            .build()
            
        // Bildirimi göster
        NotificationManagerCompat.from(this)
            .notify(System.currentTimeMillis().toInt(), notification)
    }
    
    override fun onNewToken(token: String) {
        // Yeni token'ı sunucuya gönder
        sendRegistrationToServer(token)
    }
}
```

## Medya Paylaşımı

```kotlin
class MediaRepository @Inject constructor(
    private val storage: FirebaseStorage
) {
    suspend fun uploadImage(uri: Uri): Result<String> = try {
        val filename = "img_${System.currentTimeMillis()}.jpg"
        val imageRef = storage.reference.child("images/$filename")
        
        val uploadTask = imageRef.putFile(uri).await()
        val downloadUrl = uploadTask.storage.downloadUrl.await()
        
        Result.success(downloadUrl.toString())
    } catch (e: Exception) {
        Result.failure(e)
    }
}
```

## Sonuç

Bu yazıda modern bir Android mesajlaşma uygulamasının temel bileşenlerini inceledik:

- Firebase Authentication ile kullanıcı yönetimi
- Realtime Database ile gerçek zamanlı mesajlaşma
- Cloud Storage ile medya paylaşımı
- MVVM mimarisi ve Clean Architecture
- Jetpack Compose ile modern UI
- Push Notifications

## Sonraki Adımlar

- Grup sohbetleri
- Sesli ve görüntülü arama
- Offline mesajlaşma desteği
- End-to-end encryption
- UI/UX iyileştirmeleri

Sorularınız veya önerileriniz varsa, yorum bırakabilirsiniz. Bir sonraki yazıda görüşmek üzere! 