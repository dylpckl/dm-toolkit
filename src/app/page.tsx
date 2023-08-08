"use client";
import { useEffect, useState } from "react";
function rollDie(sides: number) {
  return Math.floor(Math.random() * sides) + 1;
}

function getAbilityMod(ability: number) {
  if (typeof ability !== "number") {
    throw new Error("ability must be a number.");
  }

  if (ability < 1 || ability > 30) {
    throw new Error("ability must be in the range 1 to 30.");
  }

  if (ability === 30) {
    return 10;
  }

  // Calculate the modifier using math operations
  if (ability <= 11) {
    return Math.ceil((ability - 11) / 2);
  } else if (ability <= 21) {
    return Math.floor((ability - 12) / 2);
  } else {
    return ability - 20;
  }
}

function rollInitiative(dex: number) {
  const init = rollDie(20) + getAbilityMod(dex);
  // console.log("rolled init: " + init + rollDie(20) + getAbilityMod(dex));
  return init;
}

async function getMonster() {
  const res = await fetch("https://www.dnd5eapi.co/api/monsters/bandit");
  if (!res.ok) {
    throw new Error("Failed to fetch monster");
  }
  return res.json();
}

export default async function Home() {
  const data = await getMonster();
  // console.log(data);
  const init = rollInitiative(data.dexterity);
  console.log(data.dexterity, init);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.dexterity} {init}
    </main>
  );
}
