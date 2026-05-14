const notifications = [
  {
    Type: "Placement",
    Message: "Amazon interview tomorrow",
    Timestamp: "2026-05-14T08:00:00Z",
  },
  {
    Type: "Result",
    Message: "Mid semester result declared",
    Timestamp: "2026-05-13T10:00:00Z",
  },
  {
    Type: "Event",
    Message: "Hackathon starts tonight",
    Timestamp: "2026-05-12T15:00:00Z",
  },
  {
    Type: "Placement",
    Message: "Google hiring drive",
    Timestamp: "2026-05-14T06:00:00Z",
  },
  {
    Type: "Event",
    Message: "Tech fest registration open",
    Timestamp: "2026-05-11T09:00:00Z",
  },
];

const weights = {
  placement: 3,
  result: 2,
  event: 1,
};


function calculatePriority(notification) {
  const type = notification.Type.toLowerCase();

  const weight = weights[type] || 0;

  const timestamp = new Date(notification.Timestamp).getTime();

  const now = Date.now();

  const ageHours = (now - timestamp) / (1000 * 60 * 60);

  const recencyScore = Math.max(0, 100 - ageHours);

  return weight * 100 + recencyScore;
}


const sorted = notifications.sort(
  (a, b) => calculatePriority(b) - calculatePriority(a)
);

console.log("\nTop Notifications:\n");

sorted.forEach((n, index) => {
  console.log(`${index + 1}.`);
  console.log(`Type: ${n.Type}`);
  console.log(`Message: ${n.Message}`);
  console.log(`Timestamp: ${n.Timestamp}`);
  console.log("---------------------");
});
