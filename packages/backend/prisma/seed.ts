import { Seeder } from "../seed/Seeder";
import { PrismaService } from "../services";

async function main() {
  const seeder = new Seeder();
  seeder.run();
}

main()
  .catch((error) => {
    console.log("Seeding failed!!", error);
    process.exit(1);
  })
  .finally(async () => {
    await PrismaService.disconnect();
  });
