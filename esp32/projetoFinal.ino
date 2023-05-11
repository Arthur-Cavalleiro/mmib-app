#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>


const char* ssid = "mel";
const char* password = "12345011";
const char* mqtt_server = "broker.emqx.io";
const char* mqttTopicSub ="casa/L1";   
#define DHTPIN 22      // o sensor dht11 foi conectado ao pino 2( D4 do node MCU)
#define DHTTYPE DHT11
#define INTERVALO_ENVIO 9600


DHT dht(DHTPIN, DHTTYPE);

int ultimoEnvioMQTT = 0;


WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE (50)
char msg[MSG_BUFFER_SIZE];
int value = 0;
bool sensor_ligado = true;




void setup_wifi() {

  delay(10);
  // Começamos conectando-nos a uma rede WiFi.
  Serial.println();
  Serial.print("Conectando à ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi Conectado");
  Serial.println("Endereço IP: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Mensagem chegou [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Ligue o LED se um 1 foi recebido como primeiro caractere
  

}

void reconnect() {

  // Loop até nos reconectarmos
  while (!client.connected()) {
    Serial.print("Tentando conexão MQTT...");
    // Cria um ID de cliente aleatório
    String clientId = "testeDHT11";
    clientId += String(random(0xffff), HEX);
    // Tenta conectar
    if (client.connect(clientId.c_str())) {
      Serial.println("Conectado");
      // Uma vez conectado, publique um anúncio...
      client.publish("/testeTemp", "hello world");
      // ... e recadastrar
      client.subscribe("/testeTemp");
    } else {
      Serial.print("falhou, rc=");
      Serial.print(client.state());
      Serial.println(" tente novamente em 5 segundos");
      // Espera 5 segundos antes de tentar novamente
      delay(5000);
    }
  }
}
void ligar_sensor(bool ligar) {
  if (ligar) {
    Serial.println("Ligando o sensor DHT11...");
      dht.begin();
 
    sensor_ligado = true;
  } else {
    Serial.println("Desligando o sensor DHT11...");
    dht = DHT();
    sensor_ligado = false;
  }
}

void setup() {

  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  client.subscribe(mqttTopicSub);
   ligar_sensor(sensor_ligado);

 
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
 if (client.available()) {
    String mensagem = client.readString();
    if (mensagem == "ligar") {
      ligar_sensor(true);
    } else if (mensagem == "desligar") {
      ligar_sensor(false);
    }
  }

  // Enviar dados do sensor para o broker MQTT
  if (sensor_ligado) {
    float umidade = dht.readHumidity();
    float temperatura = dht.readTemperature();

    sprintf(MsgTemperaturaMQTT, "%f", temperatura);
    client.publish("casa/temperatura", MsgTemperaturaMQTT);
    if (isnan(umidade) || isnan(temperatura)) {
      Serial.println("Falha ao ler dados do sensor DHT11...");
      return;
    }
    String payload = String(umidade) + "," + String(temperatura);
    client.publish(mqtt_topic, payload.c_str());
  client.loop();



}
}


 void enviaDHT() {

    char MsgUmidadeMQTT[10];
    char MsgTemperaturaMQTT[10];

    float umidade = dht.readHumidity();
    float temperatura = dht.readTemperature();


    if (isnan(temperatura) || isnan(umidade))
    {
#ifdef DEBUG
      Serial.println("Falha na leitura do dht11...");
#endif
    }
    else
    {
#ifdef DEBUG
      Serial.print("Umidade: ");
      Serial.print(umidade);
      Serial.print(" \n"); //quebra de linha
      Serial.print("Temperatura: ");
      Serial.print(temperatura);
      Serial.println(" °C");
#endif

      sprintf(MsgUmidadeMQTT, "%f", umidade);
      client.publish("casa/umidade", MsgUmidadeMQTT);
      sprintf(MsgTemperaturaMQTT, "%f", temperatura);
      client.publish("casa/temperatura", MsgTemperaturaMQTT);
    }
  }
