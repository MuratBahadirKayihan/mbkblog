---
layout: post
title: "Monolitik ve Mikroservis Mimarileri: Bir Sunucuda Birden Fazla Uygulama Çalıştırma"
date: 2024-01-14
categories: [Yazılım Mimarisi, Spring Boot, Mikroservisler]
tags: [spring boot, mikroservis, monolitik, java, sistem tasarımı]
description: "Modern yazılım geliştirmede monolitik ve mikroservis mimarilerinin detaylı karşılaştırması, avantajları, dezavantajları ve gerçek dünya uygulamaları."
---

Modern yazılım geliştirme dünyasında, bir sunucuda birden fazla uygulama çalıştırma ihtiyacı oldukça yaygındır. Bu yazıda, monolitik ve mikroservis mimarilerinin bu bağlamda nasıl çalıştığını ve aralarındaki farkları ele alacağız. Ayrıca, Java ekosisteminde Spring ve Spring Boot kullanılarak bu mimarilerin nasıl uygulanabileceğini inceleyeceğiz. Bununla birlikte, bu yazının ilerleyen bölümlerinde, bir yazılım uygulamasını tasarlarken kullanılacak aşamalar ve bu süreçte kullanılacak teknolojilerden detaylı bir şekilde bahsedeceğim. Bu yazı aynı zamanda bir blog serisinin başlangıcı olarak tasarlandığından, ileri bölümlerde ele alınacak konulara da bir giriş niteliği taşıyacaktır.

## Monolitik Mimari Nedir?

Monolitik mimari, yazılımın tüm bileşenlerinin tek bir kod tabanı ve uygulama olarak çalıştığı bir yaklaşımdır. Bu modelde, kullanıcı arayüzü, iş mantığı ve veritabanı erişim katmanı aynı uygulama içinde yer alır. Uygulama, bir bütün olarak geliştirilir, dağıtılır ve çalıştırılır.

### Avantajları

1. **Basitlik**: Uygulamanın geliştirilmesi, dağıtımı ve yönetimi daha kolaydır. Tek bir uygulama olarak çalıştığı için yeni başlayanlar için daha anlaşılırdır.

2. **Kaynak Kullanımı**: Daha az bellek ve CPU gerektirir çünkü tüm işlem tek bir süreçte çalışır.

3. **Başlangıç için Uygun**: Küçük ekipler veya başlangıç projeleri için idealdir. Özellikle hızlı prototipleme süreçlerinde avantaj sağlar.

### Dezavantajları

1. **Ölçeklenebilirlik Sorunları**: Tüm uygulamayı ölçeklendirmek gerektiğinde, daha fazla kaynak tahsisi yapılması gerekir. Bu, özellikle büyük uygulamalarda kaynak israfına yol açabilir.

2. **Bakım Zorluğu**: Kod tabanı büyüdükçe, geliştirme ve hata ayıklama karmaşık hale gelir. Küçük değişikliklerin bile tüm uygulamayı etkileyebileceği riskler doğar.

3. **Tek Noktada Hata**: Bir bileşenin çökmesi, tüm uygulamanın çökmesine neden olabilir. Bu, sistem güvenilirliğini azaltır.

### Tipik Bir Monolitik Uygulama Yapısı

```plaintext
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── example/
│   │           ├── Application.java
│   │           ├── config/
│   │           │   └── SecurityConfig.java
│   │           ├── controller/
│   │           │   ├── UserController.java
│   │           │   └── BookController.java
│   │           ├── service/
│   │           │   ├── UserService.java
│   │           │   └── BookService.java
│   │           ├── repository/
│   │           │   ├── UserRepository.java
│   │           │   └── BookRepository.java
│   │           └── model/
│   │               ├── User.java
│   │               └── Book.java
│   └── resources/
│       └── application.yml
```

### Spring Boot ile Monolitik Uygulama Örneği

```java
@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookService;
    
    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        return bookService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}

@Service
@Transactional
public class BookService {
    private final BookRepository bookRepository;
    private final CacheManager cacheManager;
    
    @Autowired
    public BookService(BookRepository bookRepository, CacheManager cacheManager) {
        this.bookRepository = bookRepository;
        this.cacheManager = cacheManager;
    }
    
    @Cacheable(value = "books", key = "#id")
    public Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }
}
```

## Mikroservis Mimarisi Nedir?

Mikroservis mimarisi, bir uygulamayı küçük, bağımsız servisler halinde bölen bir yaklaşımdır. Her servis, belirli bir işlevsellikten sorumludur ve genellikle kendi veritabanına sahiptir. Servisler, API'ler veya mesajlaşma protokolleri aracılığıyla iletişim kurar.

### Avantajları

1. **Ölçeklenebilirlik**: Her mikroservis bağımsız olarak ölçeklenebilir. Örneğin, sadece yoğun trafik çeken bir servis için kaynak artırımı yapılabilir.

2. **Esneklik**: Her servis farklı bir teknoloji ile geliştirilebilir. Bu, ekiplerin uzmanlık alanlarına göre daha iyi çözümler geliştirmesini sağlar.

3. **Hata İzolasyonu**: Bir servisin çökmesi, diğerlerini etkilemez. Bu da sistemin genel güvenilirliğini artırır.

4. **Geliştirme Hızı**: Farklı ekipler bağımsız olarak çalışabilir. Bu, büyük ekiplerin paralel olarak geliştirme yapmasını kolaylaştırır.

### Dezavantajları

1. **Yönetim Karmaşıklığı**: Daha fazla servis, daha fazla yönetim zorluğu demektir. Özellikle dağıtık sistemlerin izlenmesi ve hata ayıklanması daha zordur.

2. **Kaynak Kullanımı**: Her servis kendi başına çalıştığı için daha fazla bellek ve CPU tüketimi olabilir.

3. **Dağıtım ve İzleme Zorlukları**: Çok sayıda servisle birlikte CI/CD süreçleri daha karmaşık hale gelir.

## Bir Sunucuda Çalıştırma: Kaynak Dağılımı

Tipik bir sunucu ortamında kaynak dağılımı şu şekilde olabilir:

- İşletim Sistemi: 2 GB RAM
- Monolitik Uygulama: 2.5 GB RAM
- Mikroservis Uygulaması: 4 GB RAM
- Veritabanları ve Cache: 1.5 GB RAM

### Örnek Port Yapılandırması

**Monolitik Uygulama**:
- Framework: Spring Boot
- Port: 8081
- Özellikler:
  - Kullanıcı yönetimi
  - Kitap arama
  - Temel API desteği

**Mikroservis Uygulaması**:
- Framework: Spring Boot (her servis için ayrı uygulama)
- Servisler ve Portlar:
  - API Gateway: 8080
  - Auth Service: 8082
  - User Service: 8083
  - Book Service: 8084
  - Social Service: 8085

## Örnek Senaryo: Kitaplık Uygulaması

Bir kitaplık uygulaması üzerinden her iki mimariyi karşılaştıralım:

### Monolitik Mimari ile Kitaplık Uygulaması

Tek bir Spring Boot uygulaması, tüm işlevselliği içerir:
- Kullanıcı yönetimi
- Kitap arama ve yorumlar
- Bildirimler ve etkileşimler

**Avantajlar**:
- Başlangıç için hızlı kurulum
- Tek bir işlem olarak çalıştığı için kaynak kullanımı düşük

**Dezavantajlar**:
- Kod tabanı büyüdükçe bakım zorlaşır
- Tüm uygulamayı ölçeklendirmek gereklidir

### Mikroservis Mimari ile Kitaplık Uygulaması

Her işlevsellik ayrı bir servis olarak çalışır:
- Auth Service: Kullanıcı kimlik doğrulama ve token yönetimi
- User Service: Kullanıcı profilleri ve tercihleri
- Book Service: Kitap veritabanı ve arama özellikleri
- Social Service: Paylaşımlar, yorumlar ve etkileşimler

**Avantajlar**:
- Her servis bağımsız olarak geliştirilebilir
- Sadece ihtiyaç duyulan servisler ölçeklenir

**Dezavantajlar**:
- Daha fazla işlem ve bağlantı olduğu için kaynak tüketimi artar
- Yönetim ve izleme daha karmaşıktır

## İletişim Akışı

### Mobil Uygulama ve Backend Haberleşmesi

1. Kullanıcı mobil uygulamada bir işlem başlatır (örneğin, kitap arama)
2. Mobil uygulama, API Gateway'e bir istek gönderir (örneğin, https://api.kitaplik.com/books)
3. API Gateway, isteği ilgili mikroservis olan Book Service'e yönlendirir
4. Book Service, veritabanından sonuçları alır ve cevabı JSON formatında döner
5. API Gateway bu cevabı mobil uygulamaya iletir
6. Mobil uygulama, bu veriyi işler ve kullanıcıya gösterir

## Geliştirme ve Yönetim Araçları

Modern uygulama geliştirmede kullanabileceğiniz bazı önemli araçlar:

1. **CI/CD Pipeline**: GitHub Actions veya Jenkins ile tüm servisler için otomatik dağıtım süreçleri
2. **Monitoring**: Prometheus ve Grafana ile kaynak kullanımı izleme
3. **Log Yönetimi**: ELK Stack (Elasticsearch, Logstash, Kibana)
4. **Cache**: Redis, API çağrılarının ve sorguların hızlandırılması

## Mikroservis Mimarisi: Teknik Detaylar

### API Gateway Konfigürasyonu

```yaml
# gateway-service.yml
server:
  port: 8080

spring:
  cloud:
    gateway:
      routes:
        - id: auth-service
          uri: lb://auth-service
          predicates:
            - Path=/api/auth/**
          filters:
            - StripPrefix=1
            
        - id: book-service
          uri: lb://book-service
          predicates:
            - Path=/api/books/**
          filters:
            - StripPrefix=1
            
eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
```

### Mikroservisler Arası İletişim

#### Senkron İletişim (Feign Client)

```java
@FeignClient(name = "user-service")
public interface UserServiceClient {
    @GetMapping("/users/{id}")
    UserDTO getUserById(@PathVariable("id") Long id);
}

@Service
public class BookService {
    private final UserServiceClient userServiceClient;
    
    public BookRecommendation getRecommendation(Long userId) {
        UserDTO user = userServiceClient.getUserById(userId);
        return calculateRecommendation(user);
    }
}
```

#### Asenkron İletişim (RabbitMQ)

```java
@Configuration
public class RabbitConfig {
    @Bean
    public Queue bookUpdatesQueue() {
        return new Queue("book-updates");
    }
    
    @Bean
    public TopicExchange bookExchange() {
        return new TopicExchange("book-exchange");
    }
}

@Service
public class BookEventHandler {
    @RabbitListener(queues = "book-updates")
    public void handleBookUpdate(BookUpdateEvent event) {
        log.info("Book update received: {}", event);
    }
}
```

## Uygulama Güvenliği ve İzleme

### Circuit Breaker Örneği

```java
@CircuitBreaker(name = "userService", fallbackMethod = "getUserFallback")
public UserDTO getUser(Long id) {
    return userServiceClient.getUser(id);
}

public UserDTO getUserFallback(Long id, Exception ex) {
    return new UserDTO(id, "Default User");
}
```

### Prometheus Metrik Toplama

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'spring-actuator'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['localhost:8080']
```

### Distributed Tracing

```yaml
spring:
  sleuth:
    sampler:
      probability: 1.0
  zipkin:
    baseUrl: http://localhost:9411
```

## Performans Karşılaştırması

### Kaynak Kullanımı ve Yük Testi Sonuçları

```plaintext
Apache JMeter Test Sonuçları (1000 eşzamanlı kullanıcı)

Monolitik:
- Ortalama Yanıt Süresi: 150ms
- 99. Yüzdelik: 300ms
- Hata Oranı: %0.5

Mikroservis:
- Ortalama Yanıt Süresi: 180ms
- 99. Yüzdelik: 350ms
- Hata Oranı: %0.8
```

## Sonuç

Monolitik ve mikroservis mimarilerinin her biri, belirli kullanım durumlarına göre avantajlar ve dezavantajlar sunar. Küçük bir ekip veya sınırlı bir bütçe ile başlıyorsanız, monolitik bir mimariyle başlayabilir ve zamanla mikroservis mimarisine geçiş yapabilirsiniz. Ancak ölçeklenebilirlik ve bağımsız geliştirme gereksinimleriniz varsa, mikroservis mimarisi daha uygun olacaktır.

Seçiminizi yaparken göz önünde bulundurmanız gereken faktörler:
- Ekip büyüklüğü
- Proje karmaşıklığı
- Ölçeklenebilirlik gereksinimleri
- Bakım maliyetleri
- DevOps olgunluğu

Bu yazı, bir uygulamanın mimarisine karar verme sürecinde size yol göstermeyi amaçlamaktadır. İlerleyen yazılarda, burada bahsedilen teknolojilerin her birine (Spring Boot, API Gateway, Redis, Prometheus gibi) daha detaylı olarak değineceğiz ve bir uygulama tasarlarken izlenecek adımları örneklerle açıklayacağız. 