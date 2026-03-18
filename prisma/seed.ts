import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DIRECT_URL,
});

const platforms = [
  { slug: "netflix", name: "Netflix", logo: "SiNetflix", logoColor: "#E50914", description: "Service de streaming vidéo avec films et séries originales", category: "streaming" },
  { slug: "disney-plus", name: "Disney+", logo: "SiDisneyplus", logoColor: "#113CCF", description: "Contenus Disney, Pixar, Marvel, Star Wars et National Geographic", category: "streaming" },
  { slug: "prime-video", name: "Prime Video", logo: "SiPrimevideo", logoColor: "#00A8E1", description: "Service de streaming Amazon avec films et séries", category: "streaming" },
  { slug: "hbo-max", name: "HBO Max", logo: "SiHbo", logoColor: "#000000", description: "Contenus HBO et Warner Bros", category: "streaming" },
  { slug: "apple-tv", name: "Apple TV+", logo: "SiAppletv", logoColor: "#000000", description: "Séries et films originaux Apple", category: "streaming" },
  { slug: "paramount", name: "Paramount+", logo: "SiParamountplus", logoColor: "#0064FF", description: "Films et séries Paramount", category: "streaming" },
  { slug: "youtube", name: "YouTube Premium", logo: "SiYoutube", logoColor: "#FF0000", description: "Vidéos sans publicité et YouTube Music", category: "streaming" },
  { slug: "spotify", name: "Spotify", logo: "SiSpotify", logoColor: "#1DB954", description: "Streaming musical avec millions de titres et podcasts", category: "music" },
  { slug: "apple-music", name: "Apple Music", logo: "SiApplemusic", logoColor: "#FA243C", description: "Service de streaming musical Apple", category: "music" },
  { slug: "youtube-music", name: "YouTube Music", logo: "SiYoutubemusic", logoColor: "#FF0000", description: "Musique et clips vidéo", category: "music" },
  { slug: "deezer", name: "Deezer", logo: "SiDeezer", logoColor: "#FEAA2D", description: "Streaming musical français", category: "music" },
  { slug: "tidal", name: "Tidal", logo: "SiTidal", logoColor: "#000000", description: "Streaming musical haute qualité", category: "music" },
  { slug: "soundcloud", name: "SoundCloud", logo: "SiSoundcloud", logoColor: "#FF3300", description: "Plateforme de partage musical", category: "music" },
  { slug: "xbox-gamepass", name: "Xbox Game Pass", logo: "SiXbox", logoColor: "#107C10", description: "Accès illimité à des centaines de jeux Xbox", category: "gaming" },
  { slug: "ps-plus", name: "PlayStation Plus", logo: "SiPlaystation", logoColor: "#003791", description: "Jeux gratuits et multijoueur en ligne", category: "gaming" },
  { slug: "nintendo-online", name: "Nintendo Switch Online", logo: "SiNintendoswitch", logoColor: "#E60012", description: "Jeu en ligne et catalogue de jeux classiques", category: "gaming" },
  { slug: "steam", name: "Steam", logo: "SiSteam", logoColor: "#000000", description: "Plateforme de distribution de jeux PC", category: "gaming" },
  { slug: "epic-games", name: "Epic Games", logo: "SiEpicgames", logoColor: "#313131", description: "Store de jeux vidéo et launcher", category: "gaming" },
  { slug: "peloton", name: "Peloton", logo: "SiPeloton", logoColor: "#000000", description: "Cours de fitness en direct et à la demande", category: "fitness" },
  { slug: "strava", name: "Strava", logo: "SiStrava", logoColor: "#FC4C02", description: "Réseau social pour sportifs", category: "fitness" },
  { slug: "fitbit", name: "Fitbit Premium", logo: "SiFitbit", logoColor: "#00B0B9", description: "Programmes de fitness personnalisés", category: "fitness" },
  { slug: "google-one", name: "Google One", logo: "SiGoogle", logoColor: "#4285F4", description: "Stockage cloud et avantages Google", category: "cloud" },
  { slug: "dropbox", name: "Dropbox", logo: "SiDropbox", logoColor: "#0061FF", description: "Stockage et partage de fichiers", category: "cloud" },
  { slug: "icloud", name: "iCloud+", logo: "SiIcloud", logoColor: "#3693F3", description: "Stockage cloud Apple", category: "cloud" },
  { slug: "onedrive", name: "OneDrive", logo: "SiMicrosoftonedrive", logoColor: "#0078D4", description: "Stockage cloud Microsoft", category: "cloud" },
  { slug: "coursera", name: "Coursera", logo: "SiCoursera", logoColor: "#0056D2", description: "Cours en ligne des meilleures universités", category: "elearning" },
  { slug: "udemy", name: "Udemy", logo: "SiUdemy", logoColor: "#A435F0", description: "Plateforme de cours en ligne", category: "elearning" },
  { slug: "skillshare", name: "Skillshare", logo: "SiSkillshare", logoColor: "#00FF84", description: "Cours créatifs et professionnels", category: "elearning" },
  { slug: "linkedin-learning", name: "LinkedIn Learning", logo: "SiLinkedin", logoColor: "#0A66C2", description: "Formation professionnelle en ligne", category: "elearning" },
];

async function main() {
  console.log("Seeding platforms...");

  for (const platform of platforms) {
    await prisma.platform.upsert({
      where: { slug: platform.slug },
      update: platform,
      create: platform,
    });
  }

  console.log(`Seeded ${platforms.length} platforms.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
