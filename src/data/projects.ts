export interface Project {
  id: string;
  title: string;
  code: string;
  language: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "01 Distance Based Traffic Light System using Ultrasonic Sensor",
    language: "C++ (Arduino)",
    code: `// PWM pins for LEDs (use PWM-capable pins)
#define TRIG 9
#define ECHO 10

#define GREEN 3    // PWM
#define YELLOW 5   // PWM
#define RED 6      // PWM

long duration;
int distance;

// thresholds (cm)
const int TH_GREEN = 40;
const int TH_YELLOW = 25;
const int TH_DANGER = 15;

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
  // if no echo, pulseIn returns 0
  if (duration == 0) {
    // no reading -> turn all off
    analogWrite(GREEN, 0);
    analogWrite(YELLOW, 0);
    analogWrite(RED, 0);
    Serial.println("No echo");
    delay(100);
    return;
  }

  distance = (int)(duration * 0.034 / 2.0); // cm
  Serial.println(distance);

  // Default off
  analogWrite(GREEN, 0);
  analogWrite(YELLOW, 0);
  analogWrite(RED, 0);

  if (distance > 0 && distance <= TH_DANGER) {
    // Danger: fast blink full brightness (same as old logic)
    analogWrite(GREEN, 255);
    analogWrite(YELLOW, 255);
    analogWrite(RED, 255);
    delay(50);
    analogWrite(GREEN, 0);
    analogWrite(YELLOW, 0);
    analogWrite(RED, 0);
    delay(50);
  }
  else if (distance <= TH_YELLOW) {
    // <=25 && >15 : Yellow fades in, Green stays at full (or you can keep green mapped)
    // Make green full as it was before this zone; yellow fades from 0->255 as distance goes 25->15
    analogWrite(GREEN, 255);

    int yellowBrightness = map(constrain(distance, TH_DANGER + 1, TH_YELLOW), TH_YELLOW, TH_DANGER + 1, 0, 255);
    // Because we want yellow to reach 255 when distance == TH_DANGER+1 (just above danger)
    yellowBrightness = constrain(yellowBrightness, 0, 255);
    analogWrite(YELLOW, yellowBrightness);
  }
  else if (distance <= TH_GREEN) {
    // 25 < distance <= 40 : Green fades in from 40 -> 25
    int greenBrightness = map(constrain(distance, TH_YELLOW + 1, TH_GREEN), TH_GREEN, TH_YELLOW + 1, 0, 255);
    greenBrightness = constrain(greenBrightness, 0, 255);
    analogWrite(GREEN, greenBrightness);
  }

  delay(50);
}
`
  },
];
