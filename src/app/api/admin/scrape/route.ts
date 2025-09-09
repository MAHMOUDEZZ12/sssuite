
'use server';

import { adminDb } from "@/lib/firebaseAdmin";
import { ok, fail } from "@/lib/api-helpers";
import * as cheerio from 'cheerio';

async function scrapeDxbOffplan() {
  const baseUrl = "https://dxboffplan.com";
  const response = await fetch(`${baseUrl}/developers/`);
  const html = await response.text();
  const $ = cheerio.load(html);

  const projects = [];
  const projectPromises = $('.project-item').map(async (i, el) => {
    try {
        const name = $(el).find('h2').text().trim();
        const developer = $(el).find('.developer-name span').text().trim();
        const location = $(el).find('.location-name span').text().trim();
        const priceText = $(el).find('.price-details .starting-price').text().trim();
        
        const project = {
            id: `dxboffplan-${name.toLowerCase().replace(/\s+/g, '-')}`,
            name,
            developer,
            area: location,
            priceFrom: priceText || 'N/A',
            country: 'AE',
            city: 'Dubai',
            status: 'Off-plan', // Assuming most are off-plan from this site
            tags: ['dxboffplan.com'],
        };
        projects.push(project);
    } catch(e) {
        console.error("Error parsing a project item:", e);
    }
  }).get();
  
  await Promise.all(projectPromises);
  return projects;
}

export async function GET(req: Request) {
  try {
    const projects = await scrapeDxbOffplan();
    
    if (projects.length === 0) {
      return ok({ projectsAdded: 0, message: "No projects found or failed to parse." });
    }

    const batch = adminDb.batch();
    projects.forEach(project => {
      const docRef = adminDb.collection('projects_catalog').doc(project.id);
      batch.set(docRef, project, { merge: true });
    });

    await batch.commit();

    return ok({ projectsAdded: projects.length });
  } catch (e) {
    return fail(e);
  }
}
