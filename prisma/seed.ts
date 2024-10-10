import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const storesList = [
    {
      name: 'Nikita',
      email: 'nikita@gmail.com',
      user_id: '1',
      store_id: null,
    },
    {
      name: 'Aram',
      email: 'aram@gmail.com',
      user_id: '2',
      store_id: null,
    },
    {
      name: 'Eugene',
      email: 'euegen@gmail.com',
      user_id: '3',
      store_id: null,
    },
    {
      name: 'Marina',
      email: 'marina@gmail.com',
      user_id: '4',
      store_id: null,
    },
    {
      name: 'Sergey',
      email: 'sergey@gmail.com',
      user_id: '5',
      store_id: null,
    },
    {
      name: 'Viktoria',
      email: 'viktoria@gmail.com',
      user_id: '6',
      store_id: null,
    },
    {
      name: 'Michael',
      email: 'michael@gmail.com',
      user_id: '7',
      store_id: null,
    },
    {
      name: 'Danylo',
      email: 'danylo@gmail.com',
      user_id: '8',
      store_id: null,
    },
    {
      name: 'Diana',
      email: 'diana@gmail.com',
      user_id: '9',
      store_id: null,
    },
    {
      name: 'Elena',
      email: 'elena@gmail.com',
      user_id: '10',
      store_id: null,
    },
    {
      name: 'Dmytro',
      email: 'dmytro@gmail.com',
      user_id: '11',
      store_id: null,
    },
  ];

  const existed = await prisma.employee.findMany();

  if (existed.length) {
    console.log('Stores already seeded');
    return;
  }

  const list = await prisma.employee.createMany({
    data: storesList,
    skipDuplicates: true,
  });

  console.log({ list });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
