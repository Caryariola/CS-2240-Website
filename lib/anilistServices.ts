export interface PageProps {
    params: Promise<{ 
        malId: string;      // "16498"
        animename: string;  // "Shingeki_no_Kyojin"
    }>;
}

export async function getAnilistBanner(malId : any) {
  const query = `
    query ($id: Int) {
      Media (idMal: $id, type: ANIME) {
        bannerImage
        coverImage {
          extraLarge
        }
      }
    }
  `;

  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
      variables: { id: parseInt(malId) }
    })
  });

  const result = await response.json();
  return result.data?.Media?.bannerImage || result.data?.Media?.coverImage?.extraLarge;
}