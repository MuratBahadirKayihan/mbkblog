---
layout: post
title: "Spring Boot Projesi için Docker Image Oluşturma - Dockerfile Rehberi"
date: "2025-12-10"
categories: docker spring-boot devops
description: "Spring Boot uygulamanızı Docker container'da çalıştırmak için adım adım Dockerfile oluşturma ve image build etme rehberi."
author: Murat Bahadır KAYIHAN
tags:
  - Docker
  - Spring Boot
  - DevOps
---

Spring Boot uygulamalarını Docker konteynerlerinde çalıştırmak, modern yazılım geliştirme ve dağıtım süreçlerinin önemli bir parçası haline geldi. Bu yazıda, bir Spring Boot uygulaması için Docker imajı oluşturma sürecini adım adım inceleyeceğiz.

## Docker Nedir ve Neden Kullanmalıyız?

Docker, uygulamaları konteynerler içinde paketlememizi ve çalıştırmamızı sağlayan bir platformdur. Konteynerler, uygulamanın çalışması için gereken tüm bağımlılıkları (runtime, sistem araçları, sistem kütüphaneleri vb.) içerir. Bu sayede:

- Uygulamamız her ortamda aynı şekilde çalışır ("works on my machine" problemini çözer)
- Hızlı dağıtım ve ölçeklendirme imkanı sunar
- Kaynak kullanımı açısından verimlidir
- Geliştirme, test ve üretim ortamları arasında tutarlılık sağlar

## Dockerfile Nedir?

Dockerfile, Docker imajımızın nasıl oluşturulacağını tanımlayan bir metin dosyasıdır. İçinde, imajın oluşturulması için gerekli tüm komutları sıralı bir şekilde yazarız.

## Spring Boot Projesi için Dockerfile Oluşturma

Örnek bir Dockerfile'ı inceleyelim:

```dockerfile
# Base image olarak JDK 17 kullanan resmi OpenJDK imajını seçiyoruz
FROM eclipse-temurin:17-jdk-alpine

# Çalışma dizinini belirliyoruz
WORKDIR /app

# JAR dosyasının adını bir değişkende tutuyoruz
ARG JAR_FILE=target/*.jar

# JAR dosyasını container'a kopyalıyoruz
COPY ${JAR_FILE} app.jar

# Container'ın hangi portu dinleyeceğini belirtiyoruz
EXPOSE 8080

# Uygulamayı çalıştıran komutu yazıyoruz
ENTRYPOINT ["java","-jar","/app/app.jar"]
```

Her satırı detaylı inceleyelim:

### 1. Base Image Seçimi
```dockerfile
FROM eclipse-temurin:17-jdk-alpine
```
- `eclipse-temurin`: Eclipse Foundation tarafından sağlanan OpenJDK dağıtımı
- `17-jdk`: Java 17 versiyonu
- `alpine`: Minimal Linux dağıtımı, imaj boyutunu küçük tutar

### 2. Çalışma Dizini
```dockerfile
WORKDIR /app
```
- Container içinde `/app` dizinini oluşturur ve çalışma dizini olarak belirler
- Sonraki komutlar bu dizin içinde çalışır

### 3. JAR Dosyası Tanımlama
```dockerfile
ARG JAR_FILE=target/*.jar
```
- Build sırasında kullanılacak değişkeni tanımlar
- Maven veya Gradle ile build edilen JAR dosyasının konumunu belirtir

### 4. Dosya Kopyalama
```dockerfile
COPY ${JAR_FILE} app.jar
```
- Local makinedeki JAR dosyasını container'a kopyalar
- Dosyayı `app.jar` olarak yeniden adlandırır

### 5. Port Tanımlama
```dockerfile
EXPOSE 8080
```
- Container'ın hangi portu dışarıya açacağını belirtir
- Spring Boot'un varsayılan portu 8080'dir

### 6. Çalıştırma Komutu
```dockerfile
ENTRYPOINT ["java","-jar","/app/app.jar"]
```
- Container başlatıldığında çalıştırılacak komutu belirtir
- JAR dosyasını Java ile çalıştırır

## Docker Image Oluşturma ve Çalıştırma

Dockerfile hazır olduktan sonra, aşağıdaki komutlarla imajımızı oluşturup çalıştırabiliriz:

1. Image oluşturma:
```bash
docker build -t springapp .
```

2. Container'ı çalıştırma:
```bash
docker run -p 8080:8080 springapp
```

## Multi-Stage Build ile Optimizasyon

Daha optimize bir imaj için Multi-Stage build kullanabiliriz:

```dockerfile
# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
```

Bu yaklaşımın avantajları:
- Final imaj sadece runtime için gerekli dosyaları içerir
- Build araçları ve kaynak kodlar final imajda yer almaz
- İmaj boyutu önemli ölçüde küçülür

## Environment Variables ve Spring Profiles

Docker container'ımızı farklı ortamlarda çalıştırırken environment variable'ları kullanabiliriz:

```bash
docker run -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/mydb \
  springapp
```

## Best Practices

1. **Layer Optimizasyonu**
   - Sık değişen dosyaları Dockerfile'ın sonlarına koyun
   - `.dockerignore` dosyası kullanın

2. **Güvenlik**
   - Root olmayan kullanıcı kullanın
   - Minimal base image tercih edin
   - Güvenlik taramaları yapın

3. **Performans**
   - JVM memory ayarlarını container'a uygun yapın
   - Multi-stage build kullanın
   - Cache mekanizmalarından faydalanın

## Sonuç

Docker, Spring Boot uygulamalarımızı standart ve taşınabilir bir şekilde dağıtmamızı sağlar. Doğru yapılandırılmış bir Dockerfile ile:
- Tutarlı deployment süreci
- Kolay ölçeklendirme
- İzole çalışma ortamı
- Verimli kaynak kullanımı

elde ederiz. Modern mikroservis mimarileri ve cloud-native uygulamalar için Docker kullanımı artık bir zorunluluk haline gelmiştir. 