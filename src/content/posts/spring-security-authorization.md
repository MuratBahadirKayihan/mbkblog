---
layout: post
title: "Spring Security ile Yetkilendirme (Authorization)"
date: "2025-12-05"
categories: spring security authorization
description: "Spring Security'nin yetkilendirme (authorization) özelliklerini detaylı bir şekilde incelediğimiz bu yazıda, global güvenlik yapılandırması, metod seviyesi güvenlik ve expression-based access control konularını ele alıyoruz."
author: Murat Bahadır KAYIHAN
tags: 
  - spring security
  - authorization
  - java
  - spring boot
  - security
  - authentication
  - role based access control
---

# Spring Security ile Yetkilendirme (Authorization)

Spring Security, Java uygulamalarında güvenlik çözümleri sunan güçlü bir framework'tür. Bu yazıda, Spring Security'nin yetkilendirme (authorization) özelliklerini detaylı bir şekilde inceleyeceğiz.

## Yetkilendirme Nedir?

Yetkilendirme (Authorization), bir kullanıcının sistem içerisinde hangi kaynaklara erişebileceğini ve hangi işlemleri yapabileceğini belirleyen süreçtir. Kimlik doğrulama (Authentication) "sen kimsin?" sorusuna cevap verirken, yetkilendirme "ne yapabilirsin?" sorusuna cevap verir.

## Spring Security'de Yetkilendirme Yöntemleri

### 1. Global Güvenlik Yapılandırması

Spring Security'de en temel yetkilendirme yöntemi, HTTP isteklerini global olarak yapılandırmaktır. Bu, `SecurityFilterChain` bean'i içerisinde yapılır:

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/public/**").permitAll()
            .requestMatchers("/users/**").hasRole("USER")
            .requestMatchers("/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated()
        );
    return http.build();
}
```

Bu yapılandırmada:
- `/public/**` altındaki tüm URL'ler herkese açık
- `/users/**` altındaki URL'lere sadece USER rolüne sahip kullanıcılar erişebilir
- `/admin/**` altındaki URL'lere sadece ADMIN rolüne sahip kullanıcılar erişebilir
- Diğer tüm URL'ler için kimlik doğrulaması gereklidir

### 2. Metod Seviyesinde Güvenlik

Spring Security, metod seviyesinde yetkilendirme için çeşitli annotationlar sunar:

```java
@EnableMethodSecurity
public class SecurityConfig {
    // Yapılandırma kodları
}

@RestController
@RequestMapping("/api")
public class UserController {
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.findAll();
    }
    
    @PreAuthorize("hasRole('USER') and #id == authentication.principal.id")
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
}
```

Önemli Method Security Annotationları:
- `@PreAuthorize`: Metod çağrılmadan önce yetkilendirme kontrolü yapar
- `@PostAuthorize`: Metod çağrıldıktan sonra yetkilendirme kontrolü yapar
- `@Secured`: Basit rol tabanlı yetkilendirme sağlar
- `@RolesAllowed`: Java EE standardı rol tabanlı yetkilendirme

### 3. Expression-Based Access Control

Spring Security, SpEL (Spring Expression Language) kullanarak karmaşık yetkilendirme kuralları yazmanıza olanak tanır:

```java
@PreAuthorize("hasRole('ADMIN') or " +
              "(hasRole('USER') and #user.id == authentication.principal.id)")
public void updateUser(User user) {
    // Güncelleme işlemleri
}
```

Sık Kullanılan Security Expression'lar:
- `hasRole('ROLE_NAME')`: Belirli bir role sahip mi?
- `hasAnyRole('ROLE1','ROLE2')`: Rollerden herhangi birine sahip mi?
- `hasAuthority('PERMISSION')`: Belirli bir yetkiye sahip mi?
- `isAuthenticated()`: Kimlik doğrulaması yapılmış mı?
- `isAnonymous()`: Anonim kullanıcı mı?

## En İyi Uygulamalar

1. **Principle of Least Privilege (En Az Yetki Prensibi)**
   - Kullanıcılara sadece ihtiyaç duydukları minimum yetkileri verin
   - Varsayılan olarak erişimi reddedin ve gerekli durumlarda açın

2. **Role Hierarchy (Rol Hiyerarşisi)**
   ```java
   @Bean
   public RoleHierarchy roleHierarchy() {
       RoleHierarchyImpl hierarchy = new RoleHierarchyImpl();
       hierarchy.setHierarchy("ROLE_ADMIN > ROLE_USER");
       return hierarchy;
   }
   ```

3. **Custom Security Expressions**
   ```java
   @Bean
   public MethodSecurityExpressionHandler methodSecurityExpressionHandler() {
       DefaultMethodSecurityExpressionHandler expressionHandler = new DefaultMethodSecurityExpressionHandler();
       expressionHandler.setPermissionEvaluator(new CustomPermissionEvaluator());
       return expressionHandler;
   }
   ```

## Güvenlik Testleri

Spring Security test desteği ile güvenlik kurallarınızı test edebilirsiniz:

```java
@Test
@WithMockUser(roles = "ADMIN")
void whenAdminAccessAdminEndpoint_thenOk() {
    mockMvc.perform(get("/admin/dashboard"))
           .andExpect(status().isOk());
}

@Test
@WithMockUser(roles = "USER")
void whenUserAccessAdminEndpoint_thenForbidden() {
    mockMvc.perform(get("/admin/dashboard"))
           .andExpect(status().isForbidden());
}
```

## Sonuç

Spring Security'nin yetkilendirme özellikleri, uygulamanızın güvenlik gereksinimlerini karşılamak için güçlü ve esnek bir altyapı sunar. Global yapılandırmadan metod seviyesi güvenliğe, rol tabanlı kontrollerden karmaşık kurallara kadar geniş bir yelpazede çözümler bulabilirsiniz.

Güvenlik her zaman katmanlı olmalıdır ve Spring Security'nin sunduğu bu özellikler, uygulamanızın güvenliğini sağlam temeller üzerine kurmanıza yardımcı olur. 