export interface Project {
  id: string;
  title: string;
  code: string;
  language: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Distance Based Traffic Light System using Ultrasonic Sensor",
    language: "C++ (Arduino)",
    code: `#define TRIG 9
#define ECHO 10

#define GREEN 2
#define YELLOW 3
#define RED 4

long duration;
int distance;

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);

  pinMode(GREEN, OUTPUT);
  pinMode(YELLOW, OUTPUT);
  pinMode(RED, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  // Trigger ultrasonic pulse
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  duration = pulseIn(ECHO, HIGH, 25000); // timeout ≈ 4m
  distance = duration * 0.034 / 2;

  Serial.println(distance);

  // Reset LEDs
  digitalWrite(GREEN, LOW);
  digitalWrite(YELLOW, LOW);
  digitalWrite(RED, LOW);

  if (distance > 0 && distance <= 10) {      // Adjust as you like
    // Danger: fast blink
    digitalWrite(GREEN, HIGH);
    digitalWrite(YELLOW, HIGH);
    digitalWrite(RED, HIGH);
    delay(100);
    digitalWrite(GREEN, LOW);
    digitalWrite(YELLOW, LOW);
    digitalWrite(RED, LOW);
    delay(100);
  }
  else if (distance <= 15) {        // Adjust as you like     
    digitalWrite(YELLOW, HIGH);
  }
  else if (distance <= 30) {        // Adjust as you like
    digitalWrite(GREEN, HIGH);
  }

  delay(50);
}
`
  },
];
