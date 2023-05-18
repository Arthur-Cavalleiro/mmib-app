#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>


// WiFi
const char *ssid = "mel"; // Cria a variavel ssid onde sera armarzenado o nome do WIFI que o ESP se conectara
const char *password = "12345011";  // Cria a variavel password onde sera armarzenado a sebga do WIFI que o ESP se conectara

// MQTT Broker
const char *mqtt_broker = "broker.emqx.io"; // Cria a variavel mqtt_broker onde fica armazenado o URL do Broker
const char *topic = "casa/temperatura"; // Cria a variavel topic onde fica armazendo o primeiro Topico a qual o ESP se inscrevera no Broker
const char *mqtt_username = "mel"; // Cria a variavel mqtt_username onde fica armazenado o login que sera usado para conectar no Broker
const char *mqtt_password = "123"; // Cria a variavel mqtt_password onde fica armazenado a senha que sera usado para conectar no Broker
const int mqtt_port = 1883; // Criar a variavel mqtt_port onde ficara a armazenado a porta onde o Broker estar localizada

bool estadoled = 0; // variavel de controle do estado do led

#define DHTPIN 22 // declara a pino de saida como o D0 que e tem o GPO 16
#define DHTTYPE DHT11
#define DEBUG
const int pir = 3;
const int reed = 19;
String msg; // Criar a variavel do tipo String msg
DHT dht(DHTPIN, DHTTYPE);

WiFiClient espClient; // Criar a variavel que sera usada para conectar no WIFI
PubSubClient client(espClient); // Criar a variavel que sera usada para conectar no Broker


void setup() {
  dht.begin();
  pinMode(reed, OUTPUT);
  pinMode(pir, OUTPUT);

  Serial.begin(115200); // Define que o monitor serial sera iniciado na Configuração 115200

  WiFi.begin(ssid, password); // Inicia a conexão com o WIFI
  while (WiFi.status() != WL_CONNECTED) { // Aguarda ate o Wifi estar conectado
    delay(500); // Espera 500 milisegundo
    Serial.println("Iniciado conexão..."); // Mostrar no monitor serial o texto Iniciado conexão.
  }
  Serial.println("WIFI Conectado"); // Quando o WIFI conectar mostrar no monitor serial o texto WIFI Conectado

  client.setServer(mqtt_broker, mqtt_port); // Inicia a conexão com o Broker
  client.setCallback(callback); // Verifica a resposta
  while (!client.connected()) { // Aguarda ate o Broker estar conectado
    String client_id = "testeDHT11"; // Define o ID que o ESP usara no Broker
    client_id += String(WiFi.macAddress()); // Criar um ID usando o MAC address para que nao aja conflito de ids
    Serial.printf("Conectando a Broker\n", client_id.c_str());
    if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) { // coloca o mqtt_username e o mqtt_password para que seja feito o login no Broker
      Serial.println("Broker Conectado"); // Mostrar no monitor serial o texto Broker Conectado
    } else { // Caso nao consiga se conectar a o Broker
      Serial.print("Falha na conexão"); // Mostrar no monitor serial o texto Falha na conexão
      Serial.print(client.state()); // Mostrar no monitor serial o Status da conexão
      delay(2000); // Aguarda dois segundos para uma nova conexão
    }
  }

  client.publish(topic, "Ola Aqui e o ESP"); // Publica no topico defino A mesagem Ola Null/ESP
  client.subscribe(topic);
  
}

void callback(char *topic, byte *payload, unsigned int length) { // Caso tenha uma mensagem do broker
//  Serial.print("Mensagem publica no Topico: "); // Mostrar no monitor serial o texto Mensagem publica no Topico:
//  Serial.println(topic); // Mostrar no monitor serial o Topico
//  Serial.print("Mesagem:"); // Mostrar no monitor serial o texto Mensagem:
//
//  String msg; // Reseta a messagem para que nao haja erro
//
//  for (int i = 0; i < length; i++) { // Cria um For para receber a messagem
//    Serial.print((char) payload[i]); // Mostra no monitor seril cada letra da mesagem
//    char c = ((char) payload[i]); // Amarzena as letras na variavel c
//    msg += c; // Armazena as letras para criar a mesagem
//  }

//armazena msg recebida em uma sring
  payload[length] = '\0';
  String strMSG = String((char*)payload);
 
  #ifdef DEBUG
  Serial.print("Mensagem chegou do tópico: ");
  Serial.println(topic);
  Serial.print("Mensagem:");
  Serial.print(strMSG);
  Serial.println();
  Serial.println("-----------------------");
   #endif
  if (strMSG == "1") {
   
    enviaReed(); 
    enviaDHT();
    enviaPir();
  }
  
  Serial.println(); // Pula uma linha
}

void loop() {
  client.loop(); //Inicia o loop de conexão
}
void enviaReed() {
  int reedSwitchState = digitalRead(reed);  // Lê o valor do pino do sensor de efeito reed switch
  if (reedSwitchState == HIGH) {                     // Se o interruptor foi acionado

     client.publish("casa/temperatura", "conectado");
  } else {  
    client.publish("casa/temperatura", "desconectado");
   
   
  }
  delay(500);

}
void enviaPir(){
  int pirState = digitalRead(pir);  // lê o valor do pino do sensor PIR
  if (pirState == HIGH) {              // se o sensor detectou movimento
   
   client.publish("casa/temperatura", "Movimento detectado!");
  } else {                       
     client.publish("casa/temperatura", "Desligado");
  }
  
 }

void enviaDHT() {
  char MsgTemperaturaMQTT[10];
  float temperatura = dht.readTemperature();

 if (isnan(temperatura)) 
  {
    #ifdef DEBUG
    Serial.println("Falha na leitura do dht11...");
    #endif
  } 
  else 
  {
    #ifdef DEBUG
    
    Serial.print(" \n"); //quebra de linha
    Serial.print("Temperatura: ");
    Serial.print(temperatura);
    Serial.println(" °C");
    #endif
 
   
    sprintf(MsgTemperaturaMQTT,"%f",temperatura);
    client.publish("casa/temperatura", MsgTemperaturaMQTT);
  }
}
