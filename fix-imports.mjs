import fs from 'fs/promises';
import path from 'path';

// This is a naive but effective script to replace typical import paths.
// Instead of replacing blindly, we can resolve all exported symbols and map them to their new files?
// Let's just fix the specific old paths to the new ones based on regex.

const directory = './src';

const mappings = {
  // src/pages/ -> src/features/*/pages/
  "'../components/landing/": "'../components/",
  "'../../components/landing/": "'../../components/",
  
  // From LandingPage.tsx
  "'../components/layout/Navbar'": "'../../../components/layout/Navbar'",
  "'../components/Logo'": "'../../../components/ui/Logo'",
  "'../components/landing/HeroSection'": "'../components/HeroSection'",
  "'../components/landing/MapSection'": "'../components/MapSection'",
  "'../components/landing/ProblemSolutionSection'": "'../components/ProblemSolutionSection'",
  "'../components/landing/FeaturesSection'": "'../components/FeaturesSection'",
  "'../components/Footer'": "'../../../components/layout/Footer'",
  
  // From Dashboard.tsx
  "'../components/layout/Navbar'": "'../../../components/layout/Navbar'",
  "'../components/map/SubastaMap'": "'../components/SubastaMap'",
  "'../services/subastasFiltroService'": "'../../subastas/services/subastasFiltroService'",
  "'../components/layout/SplitView'": "'../../../components/layout/SplitView'",
  "'../components/map/subasta/SubastaList'": "'../../subastas/components/SubastaList'",
  "'../services/subastasService'": "'../../subastas/services/subastasService'",
  "'../components/map/subasta/subastasMocks'": "'../../subastas/components/subastasMocks'",

  // Features Section (was in src/components/landing)
  // Needs to adjust if it imported anything from outside like FeatureCard
  "'../FeatureCard'": "'../../../components/ui/FeatureCard'",

  // Hero Section
  "'../Button'": "'../../../components/ui/Button'",

  // App.tsx
  "'./components/MainLayout'": "'./components/layout/MainLayout'",
  "'./pages/LandingPage'": "'./features/landing/pages/LandingPage'",
  "'./pages/Admin'": "'./features/dashboard/pages/Admin'",
  "'./pages/DashBoard'": "'./features/map/pages/DashBoard'",
  "'./pages/Favorites'": "'./features/dashboard/pages/Favorites'",
  "'./pages/SubastaDetail'": "'./features/subastas/pages/SubastaDetail'",

  // subastasMocks.ts
  "'./subastasIcons'": "'./subastasIcons'", // intra
};

async function fixImports(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await fixImports(fullPath);
    } else if (entry.isFile() && (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx'))) {
      let content = await fs.readFile(fullPath, 'utf8');
      
      // Generic Regex replacements for moving from src/components/* to src/features/*/components/* 
      // This is safer if we just explicitly handle the files that we know need changes.

      await fs.writeFile(fullPath, content, 'utf8');
    }
  }
}

// Instead of writing a perfect mapping which takes a long time, let's just use typescript to tell us what is broken
