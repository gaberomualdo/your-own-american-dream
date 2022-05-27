// User
// {
//   name: string;
//   money: number;
//   wage: number;
//   job: string;
//   city: string
//   spouse: string;
// }

export default class Game {
  users = [];
  started = false;
  startedAt = -1;
  events = [];
  eventsReversed = [];

  constructor(events) {
    this.events = events;
    this.eventsReversed = [];
    for (let i = events.length - 1; i >= 0; i--) {
      this.eventsReversed.push(events[i]);
    }
    events.forEach((e) => {
      switch (e.type) {
        case "user-joined":
          if (!this.users.map((e) => e.name).includes(e.name)) {
            this.users.push(e);
          }
          break;
        case "update-user":
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].name === e.name) {
              this.users[i] = { ...this.users[i], ...e.updates };
            }
          }
          break;
        case "money-changed":
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].name === e.name) {
              this.users[i].money += e.amount;
              this.users[i].money = Math.round(this.users[i].money);
            }
          }
          break;
        case "game-started":
          this.started = true;
          this.startedAt = e.time;
          break;
        default:
          break;
      }
    });
    this.users.sort((a, b) => b.money - a.money);
  }
}
