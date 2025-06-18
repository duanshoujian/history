export interface Figure {
    _id?: string;
    name: string;
    image: string;
    description: string;
    dynasty: string;
    birthYear: string;
    deathYear: string;
    birthPlace: string;
    reign: {
        start: string;
        end: string;
    };
    titles: string[];
    achievements: string[];
    family: {
        father: string;
        mother: string;
        children: string[];
    };
    burialPlace: string;
    historicalSignificance: string;
    culturalInfluence: string;
    notes: string;
}