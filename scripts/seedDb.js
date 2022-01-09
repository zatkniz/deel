const Contract = require("../src/models/Contract");
const Profile = require("../src/models/Profile");
const Job = require("../src/models/Job");

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // create tables
  await Profile.sync({ force: true });
  await Contract.sync({ force: true });
  await Job.sync({ force: true });
  //insert data
  await Promise.all([
    Profile.create({
      id: 1,
      firstName: "Harry",
      lastName: "Potter",
      profession: "Wizard",
      balance: 1150,
      type: "client",
    }),
    Profile.create({
      id: 2,
      firstName: "Mr",
      lastName: "Robot",
      profession: "Hacker",
      balance: 231.11,
      type: "client",
    }),
    Profile.create({
      id: 3,
      firstName: "John",
      lastName: "Snow",
      profession: "Knows nothing",
      balance: 451.3,
      type: "client",
    }),
    Profile.create({
      id: 4,
      firstName: "Ash",
      lastName: "Kethcum",
      profession: "Pokemon master",
      balance: 1.3,
      type: "client",
    }),
    Profile.create({
      id: 5,
      firstName: "John",
      lastName: "Lenon",
      profession: "Musician",
      balance: 64,
      type: "contractor",
    }),
    Profile.create({
      id: 6,
      firstName: "Linus",
      lastName: "Torvalds",
      profession: "Programmer",
      balance: 1214,
      type: "contractor",
    }),
    Profile.create({
      id: 7,
      firstName: "Alan",
      lastName: "Turing",
      profession: "Programmer",
      balance: 22,
      type: "contractor",
    }),
    Profile.create({
      id: 8,
      firstName: "Aragorn",
      lastName: "II Elessar Telcontarvalds",
      profession: "Fighter",
      balance: 314,
      type: "contractor",
    }),
    Contract.create({
      id: 1,
      terms: "bla bla bla",
      status: "terminated",
      client_id: 1,
      contractor_id: 5,
    }),
    Contract.create({
      id: 2,
      terms: "bla bla bla",
      status: "in_progress",
      client_id: 1,
      contractor_id: 6,
    }),
    Contract.create({
      id: 3,
      terms: "bla bla bla",
      status: "in_progress",
      client_id: 2,
      contractor_id: 6,
    }),
    Contract.create({
      id: 4,
      terms: "bla bla bla",
      status: "in_progress",
      client_id: 2,
      contractor_id: 7,
    }),
    Contract.create({
      id: 5,
      terms: "bla bla bla",
      status: "new",
      client_id: 3,
      contractor_id: 8,
    }),
    Contract.create({
      id: 6,
      terms: "bla bla bla",
      status: "in_progress",
      client_id: 3,
      contractor_id: 7,
    }),
    Contract.create({
      id: 7,
      terms: "bla bla bla",
      status: "in_progress",
      client_id: 4,
      contractor_id: 7,
    }),
    Contract.create({
      id: 8,
      terms: "bla bla bla",
      status: "in_progress",
      client_id: 4,
      contractor_id: 6,
    }),
    Contract.create({
      id: 9,
      terms: "bla bla bla",
      status: "in_progress",
      client_id: 4,
      contractor_id: 8,
    }),
    Job.create({
      description: "work",
      price: 200,
      contract_id: 1,
    }),
    Job.create({
      description: "work",
      price: 201,
      contract_id: 2,
    }),
    Job.create({
      description: "work",
      price: 202,
      contract_id: 3,
    }),
    Job.create({
      description: "work",
      price: 200,
      contract_id: 4,
    }),
    Job.create({
      description: "work",
      price: 200,
      contract_id: 7,
    }),
    Job.create({
      description: "work",
      price: 2020,
      paid: true,
      payment_date: "2020-08-15T19:11:26.737Z",
      contract_id: 7,
    }),
    Job.create({
      description: "work",
      price: 200,
      paid: true,
      payment_date: "2020-08-15T19:11:26.737Z",
      contract_id: 2,
    }),
    Job.create({
      description: "work",
      price: 200,
      paid: true,
      payment_date: "2020-08-16T19:11:26.737Z",
      contract_id: 3,
    }),
    Job.create({
      description: "work",
      price: 200,
      paid: true,
      payment_date: "2020-08-17T19:11:26.737Z",
      contract_id: 1,
    }),
    Job.create({
      description: "work",
      price: 200,
      paid: true,
      payment_date: "2020-08-17T19:11:26.737Z",
      contract_id: 5,
    }),
    Job.create({
      description: "work",
      price: 21,
      paid: true,
      payment_date: "2020-08-10T19:11:26.737Z",
      contract_id: 1,
    }),
    Job.create({
      description: "work",
      price: 21,
      paid: true,
      payment_date: "2020-08-15T19:11:26.737Z",
      contract_id: 2,
    }),
    Job.create({
      description: "work",
      price: 121,
      paid: true,
      payment_date: "2020-08-15T19:11:26.737Z",
      contract_id: 3,
    }),
    Job.create({
      description: "work",
      price: 121,
      paid: true,
      payment_date: "2020-08-14T23:11:26.737Z",
      contract_id: 3,
    }),
  ]);
}
