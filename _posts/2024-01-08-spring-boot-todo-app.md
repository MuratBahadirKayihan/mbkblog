---
layout: post
title: "Spring Boot ile Modern Bir Todo Uygulaması Geliştirme"
date: 2024-01-08
categories: [Backend, Java, Spring Boot, REST API, PostgreSQL]
description: "Spring Boot kullanarak modern bir Todo uygulaması nasıl geliştirilir? JWT authentication, PostgreSQL veritabanı ve Docker container kullanımını adım adım öğrenelim."
---

Modern bir backend uygulaması geliştirmek istiyorsanız, doğru yerdesiniz! Bu yazıda Spring Boot framework'ü kullanarak tam teşekküllü bir Todo uygulaması geliştireceğiz. Projemizde JWT tabanlı kimlik doğrulama, PostgreSQL veritabanı ve Docker container kullanacağız.

## Neler Öğreneceğiz?

- Spring Boot 3.2 ile proje kurulumu
- PostgreSQL veritabanı entegrasyonu
- JPA/Hibernate ile veritabanı işlemleri
- JWT tabanlı kimlik doğrulama
- RESTful API tasarımı
- Docker ile containerization
- Unit ve Integration testleri
- Swagger ile API dokümantasyonu

## Proje Yapısı

```plaintext
todo-app/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── mbkayihan/
│   │   │           └── todoapp/
│   │   │               ├── TodoApplication.java
│   │   │               ├── config/
│   │   │               ├── controller/
│   │   │               ├── model/
│   │   │               ├── repository/
│   │   │               └── service/
│   │   └── resources/
│   │       └── application.yml
│   └── test/
├── pom.xml
└── Dockerfile
```

## Gerekli Bağımlılıklar

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt</artifactId>
        <version>0.9.1</version>
    </dependency>
</dependencies>
```

## Veritabanı Modeli

```java
@Entity
@Table(name = "todos")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(nullable = false)
    private boolean completed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Getter ve Setter metodları
}
```

## JWT Kimlik Doğrulama

Güvenli bir API için JWT tabanlı kimlik doğrulama sistemi kuracağız:

```java
@Service
public class JwtTokenProvider {
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private int jwtExpiration;

    public String generateToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
        
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpiration))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            // Token imzası geçersiz
        } catch (MalformedJwtException ex) {
            // Token formatı geçersiz
        } catch (ExpiredJwtException ex) {
            // Token süresi dolmuş
        } catch (UnsupportedJwtException ex) {
            // Token desteklenmiyor
        } catch (IllegalArgumentException ex) {
            // Token boş
        }
        return false;
    }
}
```

## Controller Katmanı

RESTful API endpoint'lerimizi tanımlayalım:

```java
@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<TodoDTO> getAllTodos() {
        return todoService.getAllTodos();
    }

    @PostMapping
    public TodoDTO createTodo(@Valid @RequestBody TodoRequest request) {
        return todoService.createTodo(request);
    }

    @PutMapping("/{id}")
    public TodoDTO updateTodo(@PathVariable Long id, @Valid @RequestBody TodoRequest request) {
        return todoService.updateTodo(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
    }

    @PatchMapping("/{id}/complete")
    public TodoDTO completeTodo(@PathVariable Long id) {
        return todoService.completeTodo(id);
    }
}
```

## Service Katmanı

İş mantığımızı service katmanında yönetelim:

```java
@Service
@Transactional
public class TodoService {
    private final TodoRepository todoRepository;
    private final UserService userService;

    public TodoService(TodoRepository todoRepository, UserService userService) {
        this.todoRepository = todoRepository;
        this.userService = userService;
    }

    public List<TodoDTO> getAllTodos() {
        User currentUser = userService.getCurrentUser();
        return todoRepository.findByUser(currentUser)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TodoDTO createTodo(TodoRequest request) {
        User currentUser = userService.getCurrentUser();
        
        Todo todo = new Todo();
        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        todo.setCompleted(false);
        todo.setUser(currentUser);

        return convertToDTO(todoRepository.save(todo));
    }

    private TodoDTO convertToDTO(Todo todo) {
        return TodoDTO.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .description(todo.getDescription())
                .completed(todo.isCompleted())
                .build();
    }
}
```

## Docker ile Deployment

Uygulamamızı container'da çalıştırmak için Dockerfile:

```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

Ve docker-compose.yml:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/tododb
      - SPRING_DATASOURCE_USERNAME=postgres
      - SPRING_DATASOURCE_PASSWORD=password

  db:
    image: postgres:14-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=tododb
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Unit Test Örneği

Service katmanı için bir test örneği:

```java
@ExtendWith(MockitoExtension.class)
class TodoServiceTest {
    @Mock
    private TodoRepository todoRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private TodoService todoService;

    @Test
    void createTodo_ShouldReturnTodoDTO() {
        // Given
        User user = new User();
        TodoRequest request = new TodoRequest("Test Todo", "Test Description");
        Todo todo = new Todo();
        todo.setId(1L);
        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        todo.setCompleted(false);
        todo.setUser(user);

        when(userService.getCurrentUser()).thenReturn(user);
        when(todoRepository.save(any(Todo.class))).thenReturn(todo);

        // When
        TodoDTO result = todoService.createTodo(request);

        // Then
        assertNotNull(result);
        assertEquals(request.getTitle(), result.getTitle());
        assertEquals(request.getDescription(), result.getDescription());
        assertFalse(result.isCompleted());
    }
}
```

## Swagger Dokümantasyonu

API'mizi dokümante etmek için OpenAPI 3.0 kullanacağız:

```java
@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Todo API")
                        .version("1.0")
                        .description("Modern bir Todo uygulaması API dokümantasyonu"));
    }
}
```

## Sonuç

Bu yazıda modern bir Spring Boot uygulamasının temel bileşenlerini inceledik:

- JWT tabanlı güvenlik sistemi
- Katmanlı mimari (Controller, Service, Repository)
- PostgreSQL veritabanı entegrasyonu
- Docker ile containerization
- Unit testler
- API dokümantasyonu

## Sonraki Adımlar

- Frontend uygulaması geliştirme (React/Angular)
- CI/CD pipeline kurulumu
- Kubernetes deployment
- Performans optimizasyonları
- Monitoring ve logging

Sorularınız veya önerileriniz varsa, yorum bırakabilirsiniz. Bir sonraki yazıda görüşmek üzere! 