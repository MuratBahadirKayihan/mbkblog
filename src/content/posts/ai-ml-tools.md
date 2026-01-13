---
layout: post
title: "AI ML Tools"
date: "2025-12-28"
categories: yapay-zeka makine-ogrenmesi deep-learning mlops
description: "Yapay zeka ve makine öğrenmesi araçlarının detaylı incelemesi ve kullanım örnekleri."
author: Murat Bahadır KAYIHAN
tags:
  - Yapay Zeka
  - Makine Öğrenmesi
  - Deep Learning
  - MLOps
---

Yapay zeka ve makine öğrenmesi alanında çalışmak isteyenler için güncel araçları ve teknolojileri derledim. Bu yazıda, veri bilimi ve yapay zeka projelerinde kullanabileceğiniz modern araçları inceleyeceğiz.

## Temel Kütüphaneler ve Araçlar

### 1. Veri Manipülasyonu ve Analizi
```python
import pandas as pd
import numpy as np

# Veri okuma
df = pd.read_csv('data.csv')

# Veri analizi
summary = df.describe()
missing_values = df.isnull().sum()

# Veri manipülasyonu
df['new_column'] = df['old_column'].apply(lambda x: x * 2)
df = df.groupby('category').agg({'value': 'mean'})
```

### 2. Görselleştirme
```python
import seaborn as sns
import matplotlib.pyplot as plt

# Dağılım grafiği
plt.figure(figsize=(10, 6))
sns.histplot(data=df, x='value', hue='category')
plt.title('Değer Dağılımı')
plt.show()

# Korelasyon matrisi
plt.figure(figsize=(12, 8))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
plt.title('Korelasyon Matrisi')
plt.show()
```

## Modern ML Frameworks

### 1. PyTorch
```python
import torch
import torch.nn as nn

class NeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(784, 128),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(128, 10)
        )
    
    def forward(self, x):
        return self.layers(x)

# Model eğitimi
model = NeuralNetwork()
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters())

for epoch in range(num_epochs):
    for batch in dataloader:
        optimizer.zero_grad()
        outputs = model(batch.x)
        loss = criterion(outputs, batch.y)
        loss.backward()
        optimizer.step()
```

### 2. TensorFlow
```python
import tensorflow as tf

# Model oluşturma
model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(10, activation='softmax')
])

# Model derleme
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Model eğitimi
history = model.fit(
    x_train, y_train,
    epochs=10,
    validation_data=(x_val, y_val)
)
```

## Modern MLOps Araçları

### 1. MLflow
```python
import mlflow

# Deney takibi
mlflow.start_run()

# Parametreleri kaydet
mlflow.log_param("learning_rate", 0.01)
mlflow.log_param("num_epochs", 10)

# Metrikleri kaydet
mlflow.log_metric("accuracy", 0.95)
mlflow.log_metric("loss", 0.05)

# Modeli kaydet
mlflow.pytorch.log_model(model, "model")

mlflow.end_run()
```

### 2. DVC (Data Version Control)
```bash
# Veri versiyonlama
dvc init
dvc add data/
git add data.dvc
git commit -m "Add dataset"

# Uzak depo yapılandırma
dvc remote add -d storage s3://mybucket/dvc-storage
dvc push

# Veri güncelleme
dvc pull
```

## Doğal Dil İşleme (NLP)

### 1. Transformers
```python
from transformers import pipeline

# Metin sınıflandırma
classifier = pipeline("sentiment-analysis")
result = classifier("Bu ürün gerçekten harika!")

# Metin üretme
generator = pipeline("text-generation")
text = generator(
    "Yapay zeka teknolojileri",
    max_length=50,
    num_return_sequences=1
)[0]['generated_text']

# Soru cevaplama
qa = pipeline("question-answering")
context = "Yapay zeka, insan zekasını taklit eden sistemlerdir."
question = "Yapay zeka nedir?"
answer = qa(question=question, context=context)
```

### 2. spaCy
```python
import spacy

# Türkçe model yükleme
nlp = spacy.load("tr_core_news_lg")

# Metin işleme
doc = nlp("Yapay zeka ve makine öğrenmesi çok önemli teknolojilerdir.")

# Named Entity Recognition
for ent in doc.ents:
    print(f"Entity: {ent.text}, Label: {ent.label_}")

# Dependency Parsing
for token in doc:
    print(f"{token.text} -> {token.dep_}")
```

## Görüntü İşleme

### 1. OpenCV
```python
import cv2
import numpy as np

# Görüntü okuma ve işleme
img = cv2.imread('image.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Kenar tespiti
edges = cv2.Canny(gray, 100, 200)

# Yüz tespiti
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
faces = face_cascade.detectMultiScale(gray, 1.3, 5)

for (x, y, w, h) in faces:
    cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
```

### 2. Pillow
```python
from PIL import Image, ImageEnhance

# Görüntü işleme
image = Image.open('image.jpg')
enhancer = ImageEnhance.Brightness(image)
brightened = enhancer.enhance(1.5)

# Görüntü boyutlandırma
resized = image.resize((800, 600))

# Görüntü döndürme
rotated = image.rotate(45)
```

## Otomatik Makine Öğrenmesi (AutoML)

### 1. AutoKeras
```python
import autokeras as ak

# Image classification
clf = ak.ImageClassifier(
    max_trials=10,
    overwrite=True
)

# Model arama ve eğitim
clf.fit(x_train, y_train, epochs=10)

# En iyi modeli al
model = clf.export_model()
```

### 2. PyCaret
```python
from pycaret.classification import *

# Deney ortamı kurulumu
exp = setup(data, target='target')

# En iyi modeli bul
best_model = compare_models()

# Model tahminleri
predictions = predict_model(best_model, data=test_data)
```

## Deployment ve Servisleştirme

### 1. FastAPI
```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class PredictionInput(BaseModel):
    features: List[float]

@app.post("/predict")
async def predict(input_data: PredictionInput):
    prediction = model.predict([input_data.features])
    return {"prediction": prediction.tolist()}
```

### 2. Docker
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Model İzleme ve Analiz

### 1. Weights & Biases
```python
import wandb

# Deney başlatma
wandb.init(project="my-project")

# Konfigürasyon
config = wandb.config
config.learning_rate = 0.01
config.batch_size = 32

# Metrik loglama
wandb.log({
    "accuracy": 0.95,
    "loss": 0.05
})

# Görsel loglama
wandb.log({
    "confusion_matrix": wandb.plot.confusion_matrix(
        y_true=y_true,
        preds=y_pred,
        class_names=classes
    )
})
```

### 2. TensorBoard
```python
from torch.utils.tensorboard import SummaryWriter

writer = SummaryWriter('runs/experiment_1')

# Metrik loglama
writer.add_scalar('Loss/train', loss, epoch)
writer.add_scalar('Accuracy/train', acc, epoch)

# Model grafiği
writer.add_graph(model, input_to_model)

writer.close()
```

## En İyi Uygulamalar

1. **Veri Hazırlama**
   - Veri temizleme ve normalizasyon
   - Feature engineering
   - Cross-validation

2. **Model Geliştirme**
   - Hyperparameter optimization
   - Ensemble methods
   - Transfer learning

3. **MLOps**
   - Continuous training
   - Model versiyonlama
   - A/B testing

4. **Monitoring**
   - Model drift tespiti
   - Performans metrikleri
   - Anomali tespiti

## Sonuç

Modern yapay zeka ve makine öğrenmesi projeleri, çeşitli araçların ve teknolojilerin bir araya gelmesiyle oluşur. Bu araçları etkin kullanmak:

- Geliştirme sürecini hızlandırır
- Model performansını artırır
- Bakım ve izlemeyi kolaylaştırır
- Takım çalışmasını iyileştirir

## Kaynaklar

- [PyTorch Dokümantasyonu](https://pytorch.org/docs)
- [TensorFlow Rehberi](https://tensorflow.org/guide)
- [MLflow Dokümantasyonu](https://mlflow.org/docs)
- [Weights & Biases Rehberi](https://docs.wandb.ai)

Sorularınız veya deneyimleriniz varsa, yorum bırakabilirsiniz. Bir sonraki yazıda görüşmek üzere! 