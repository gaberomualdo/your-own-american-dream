import config from "./config";

function getRandomSubarray(arr, size) {
  var shuffled = arr.slice(0),
    i = arr.length,
    min = i - size,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

export function classes(...x) {
  return x.join(" ");
}
export function makeTitle(title) {
  if (title.length === 0) return config.name;
  return `${title} • ${config.name}`;
}

export const formatNum = (n) =>
  n.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

export const characterNames = [
  "Jay Gatsby",
  "Nick Carraway",
  "Daisy Buchanan",
  "Tom Buchanan",
  "Jordan Baker",
  "Myrtle Wilson",
  "George Wilson",
  "Janie Crawford",
  "Tea Cake",
  "Joe Starks",
  "Logan Killicks",
  "Walt Whitman",
  "Bartleby The Scrivener",
  "Ralph Emerson",
  "Henry Thoreau",
  "Lutie Johnson",
  "Bub Johnson",
  "Hester Prynne",
  "Superintendent Jones",
  "Daniel Xiao",
  "Gabriel Romualdo",
];
export const quizQuestions = [
  {
    content: "What was Bartleby's job?",
    options: ["copyist", "secretary", "lawyer", "homeless"],
    correct: 0,
  },
  {
    content: "Where did Bartleby work before the events of the novel?",
    options: [
      "Post office",
      "Writing workshop",
      "Dead letter office",
      "Law firm",
    ],
    correct: 2,
  },
  {
    content: "where did Bartleby work during the events of the novel?",
    options: ["pennsylvania", "new york", "ohio"],
    correct: 1,
  },
  {
    content:
      "who was the narrator's oldest employee in bartleby the scrivener?",
    options: ["bartleby", "nippers", "ginger nut", "Turkey"],
    correct: 3,
  },
  {
    content: "what does nippers have?",
    options: [
      "a big heart",
      "a good work ethic",
      "indigestion",
      "a fulfilling life",
    ],
    correct: 2,
  },
  {
    content:
      "where was the narrator going in bartleby the scrivener when they decided to check in on the office on a sunday?",
    options: [
      "trinity church",
      "St. Paul's Cathedral",
      "The Empire State Building",
    ],
    correct: 0,
  },
  {
    content: "Where did Nick and Tom go to college?",
    options: ["Stanford", "Harvard", "Yale", "Princeton"],
    correct: 2,
  },
  {
    content: "Why did Gatsby drop out?",
    options: [
      "He entered the illegal alchohol trade",
      "He was ashamed for how he earned money for it",
      "He thought it was worthless",
      "He went to chase after Daisy",
    ],
    correct: 1,
  },
  {
    content: "Where is Gatsby's mansion?",
    options: ["East Egg", "West Egg", "South Egg", "North Egg"],
    correct: 1,
  },
  {
    content: "Why does Tom hit Myrtle?",
    options: [
      "She kept bringing up Daisy",
      "Alchohol",
      "She's annoying",
      "She wants to leave him",
    ],
    correct: 1,
  },
  {
    content: "Flapper? Clapper? Snapper? Wrapper?",
    options: ["Flapper", "Clapper", "Snapper", "Wrapper"],
    correct: 0,
  },
  {
    content: "What does the narrator do to bartleby?",
    options: [
      "fires him",
      "threatens him",
      "moves away and abandones him",
      "moves him to another position",
    ],
    correct: 2,
  },
  {
    content: "Who kills Myrtle?",
    options: ["Tom", "George", "Gatsby", "Daisy"],
    correct: 3,
  },
];

const possibleCities = [
  "New York City",
  "Boston",
  "Philadelphia",
  "Los Angeles",
  "Miami",
  "Washington D.C.",
  "Chicago",
  "Hartford",
  "St. Louis",
  "Denver",
  "Atlanta",
  "San Francisco",
];
const possibleJobs = [
  "Carpenter",
  "Farmer",
  "Teacher",
  "Doctor",
  "Lawyer",
  "Engineer",
  "Scientist",
  "Writer",
  "Artist",
  "Musician",
  "Soldier",
  "Politician",
];
const possibleSpouses = [
  "Max Gill",
  "Finley Day",
  "Ashton Matthews",
  "Jake Clark",
  "Nicholas Robinson",
  "Orlando Cannon",
  "Kameron Paul",
  "Lucca Preston",
  "Jace Scott",
  "Hank Raymond",
  "Megan Nicholson",
  "Alicia Robertson",
  "Isla Bates",
  "Keira Davies",
  "Megan Carr",
  "Charity Sweeney",
  "Carla Romero",
  "Mallory Tyson",
  "Michaela Shields",
  "Sloan Hickman",
  "Kian Rogers",
  "Evan Young",
  "Cody Mitchell",
  "Kyle Ryan",
  "Frankie Young",
  "Jacoby Ford",
  "Griffin Shepard",
  "Lennox Sharpe",
  "Sergio Richmond",
  "Tommy Dunn",
  "Faith Thompson",
  "Laura Wright",
  "Elsie Lowe",
  "Emilia Ward",
  "Danielle Howard",
  "Juliet Bartlett",
  "Laura Beard",
  "Tiffany Henry",
  "Lailah Hill",
  "Alisson Pacheco",
];
const decisionsList = [
  {
    when: {
      month: "March",
      year: 1920,
    },
    content: "The economy is changing. Choose a new job:",
    options: getRandomSubarray(possibleJobs, 4),
    callback: (option, name, addEvent, setStatus) => {
      const wage = 1000 + Math.floor(Math.random() * 3500);
      setStatus(`You are now a ${option}, earning $${wage} per month.`);
      addEvent({
        type: "update-user",
        name,
        updates: {
          job: option,
          wage,
          costs: wage + 50 - Math.floor(Math.random() * 200),
        },
      });
    },
  },
  {
    when: {
      month: "October",
      year: 1921,
    },
    content: "Choose a City to Live In",
    options: getRandomSubarray(possibleCities, 4),
    callback: (option, name, addEvent, setStatus) => {
      setStatus(`You've now moved to ${option}!`);
      addEvent({
        type: "update-user",
        name,
        updates: {
          city: option,
        },
      });
    },
  },
  {
    when: {
      month: "January",
      year: 1947,
    },
    content:
      "You need to get married to achieve the Dream. Choose a new spouse:",
    options: getRandomSubarray(possibleSpouses, 4),
    callback: (option, name, addEvent, setStatus) => {
      addEvent({
        type: "update-user",
        name,
        updates: {
          spouse: option,
        },
      });
    },
  },
];
const whenGen = () => {
  return {
    month: ["February", "March", "April", "May", "June", "July", "August"][
      Math.floor(Math.random() * 7)
    ],
    year: Math.floor(Math.random() * 40) + 1920,
  };
};
const decisionsCountMultiplier = 12;
for (let x = 0; x < Math.random() * decisionsCountMultiplier * 7 + 1; x++) {
  decisionsList.push({
    when: whenGen(),
    content: `Oh No! You just got ${
      ["the flu", "a horrible virus", "a broken arm", "a broken leg"][
        Math.floor(Math.random() * 4)
      ]
    } so you spent $1,500 on healthcare. Get well soon.`,
    options: [
      "Got it, I'll pay the bill.",
      "Well, I have no options. I'll pay it.",
    ],
    callback: (option, name, addEvent, setStatus) => {
      addEvent({
        type: "money-changed",
        name,
        amount: -1000,
      });
    },
  });
}
for (let x = 0; x < Math.random() * decisionsCountMultiplier * 7 + 1; x++) {
  decisionsList.push({
    when: whenGen(),
    content: "Want to buy lottery tickets for $100?",
    options: ["Yes", "No"],
    callback: (option, name, addEvent, setStatus) => {
      if (option === "Yes") {
        if (Math.random() > 0.975) {
          setStatus("You won the lottery! You just made $25K!");
          addEvent({
            type: "money-changed",
            name,
            amount: 25000,
          });
        } else {
          setStatus("You did not win the lottery.");
          addEvent({
            type: "money-changed",
            name,
            amount: -100,
          });
        }
      } else {
        setStatus("You could've won $25,000+... buy next time?");
      }
    },
  });
}
for (let x = 0; x < Math.random() * decisionsCountMultiplier * 5 + 1; x++) {
  decisionsList.push({
    when: whenGen(),
    content: "You got beat up at an alley in the city. What do you do?",
    options: ["Pay $1000 in legal fees", "Pay $900 in healthcare"],
    callback: (option, name, addEvent, setStatus) => {
      if (option.includes("legal")) {
        addEvent({
          type: "money-changed",
          name,
          amount: -1000,
        });
      } else {
        addEvent({
          type: "money-changed",
          name,
          amount: -9000,
        });
      }
    },
  });
}
for (let x = 0; x < Math.random() * decisionsCountMultiplier * 4 + 1; x++) {
  decisionsList.push({
    when: whenGen(),
    content:
      "Due to economic conditions the IRS has enforced a new penalty on people like you.",
    options: [
      "Risk going to jail by paying only $500 in taxes",
      "Pay $750 in taxes",
    ],
    callback: (option, name, addEvent, setStatus) => {
      if (option.includes("jail")) {
        addEvent({
          type: "money-changed",
          name,
          amount: -500,
        });
      } else {
        addEvent({
          type: "money-changed",
          name,
          amount: -750,
        });
      }
    },
  });
}
for (let x = 0; x < Math.random() * decisionsCountMultiplier * 5 + 1; x++) {
  decisionsList.push({
    when: whenGen(),
    content:
      "You find a beautiful potential partner on the street. What do you do?",
    options: ["Take them on a date for $100", "Continue walking"],
    callback: (option, name, addEvent, setStatus) => {
      if (option.includes("date")) {
        addEvent({
          type: "money-changed",
          name,
          amount: -100,
        });
      } else {
      }
    },
  });
}
for (let x = 0; x < Math.random() * decisionsCountMultiplier * 3 + 1; x++) {
  decisionsList.push({
    when: whenGen(),
    content:
      "There's an political election coming up. Want to donate $500 to your favorite candidate?",
    options: ["Yes", "No"],
    callback: (option, name, addEvent, setStatus) => {
      if (option.includes("Yes")) {
        addEvent({
          type: "money-changed",
          name,
          amount: -500,
        });
      } else {
      }
    },
  });
}
for (let x = 0; x < Math.random() * decisionsCountMultiplier * 4 + 1; x++) {
  decisionsList.push({
    when: whenGen(),
    content: "There's a fire in your home. What do you do?",
    options: ["Fix everything for $500", "Fix the bare minimum for $250"],
    callback: (option, name, addEvent, setStatus) => {
      if (option.includes("everything")) {
        addEvent({
          type: "money-changed",
          name,
          amount: -500,
        });
      } else {
        addEvent({
          type: "money-changed",
          name,
          amount: -250,
        });
      }
    },
  });
}
for (let x = 0; x < Math.random() * decisionsCountMultiplier * 4 + 1; x++) {
  decisionsList.push({
    when: whenGen(),
    content: "The economy is changing. Choose a new job:",
    options: getRandomSubarray(possibleJobs, 4),
    callback: (option, name, addEvent, setStatus) => {
      const wage = 1000 + Math.floor(Math.random() * 3500);
      setStatus(`You are now a ${option}, earning $${wage} per month.`);
      addEvent({
        type: "update-user",
        name,
        updates: {
          job: option,
          wage,
          costs: wage + 50 - Math.floor(Math.random() * 200),
        },
      });
    },
  });
}
for (let x = 0; x < Math.random() * decisionsCountMultiplier * 4 + 1; x++) {
  decisionsList.push({
    when: whenGen(),
    content: "The country is changing. Choose a new city to live in:",
    options: getRandomSubarray(possibleCities, 4),
    callback: (option, name, addEvent, setStatus) => {
      setStatus(`You've now moved to ${option}!`);
      addEvent({
        type: "update-user",
        name,
        updates: {
          city: option,
        },
      });
    },
  });
}
for (let x = 0; x < Math.random() * decisionsCountMultiplier * 6 + 1; x++) {
  decisionsList.push({
    when: whenGen(),
    content: "Your boss is mad at you for not working hard. What do you do?",
    options: [
      "Bribe him with $1000 to stop being mad",
      "Take a big cut in pay this month",
    ],
    callback: (option, name, addEvent, setStatus) => {
      if (option.includes("Bribe")) {
        addEvent({
          type: "money-changed",
          name,
          amount: -1000,
        });
      } else {
        addEvent({
          type: "money-changed",
          name,
          amount: -(500 + Math.floor(Math.random() * 1000)),
        });
      }
    },
  });
}
for (let x = 0; x < Math.random() * decisionsCountMultiplier * 6 + 1; x++) {
  decisionsList.push({
    when: whenGen(),
    content:
      "You need to get married to achieve the American Dream. Choose a new spouse:",
    options: getRandomSubarray(possibleSpouses, 4),
    callback: (option, name, addEvent, setStatus) => {
      addEvent({
        type: "update-user",
        name,
        updates: {
          spouse: option,
        },
      });
    },
  });
}
for (let x = 0; x < Math.random() * decisionsCountMultiplier * 6 + 1; x++) {
  decisionsList.push({
    when: whenGen(),
    content:
      "You live in a dangerous area and got shot on the street. What do you do?",
    options: ["Spent $449 on medical fees", "Stitch it up yourself for $100"],
    callback: (option, name, addEvent, setStatus) => {
      if (option.includes("Stitch")) {
        addEvent({
          type: "money-changed",
          name,
          amount: -100,
        });
      } else {
        addEvent({
          type: "money-changed",
          name,
          amount: -449,
        });
      }
    },
  });
}
for (let x = 0; x < Math.random() * 3 + 1; x++) {
  decisionsList.push({
    when: whenGen(),
    content: "Wow! Your boss increased your salary by 20%! What do you do?",
    options: ["Take the new salary", "Ask for a higher raise"],
    callback: (option, name, addEvent, setStatus, profile) => {
      if (option.includes("new salary")) {
        addEvent({
          type: "update-user",
          name,
          updates: {
            wage: profile.wage * 1.2,
          },
        });
      } else {
      }
    },
  });
}
for (let x = 0; x < Math.random() * decisionsCountMultiplier + 1; x++) {
  decisionsList.push({
    when: whenGen(),
    content:
      "Your boss is mad and decreased your salary by 15%. What do you do?",
    options: ["Ask for only a 10% decrease", "Take the decrease"],
    callback: (option, name, addEvent, setStatus, profile) => {
      if (option.includes("10%")) {
        addEvent({
          type: "update-user",
          name,
          updates: {
            wage: profile.wage * 0.9,
          },
        });
      } else {
        addEvent({
          type: "update-user",
          name,
          updates: {
            wage: profile.wage * 0.85,
          },
        });
      }
    },
  });
}
for (let x = 0; x < Math.random() * decisionsCountMultiplier * 0.4 + 1; x++) {
  decisionsList.push({
    when: whenGen(),
    content: "You and your spouse just had a baby. What do you do?",
    options: ["Increase costs by $250 per month", "Put it up for adoption"],
    callback: (option, name, addEvent, setStatus, profile) => {
      if (option.includes("250")) {
        addEvent({
          type: "update-user",
          name,
          updates: {
            costs: profile.costs + 250,
          },
        });
      } else {
      }
    },
  });
}

export const decisions = decisionsList;
