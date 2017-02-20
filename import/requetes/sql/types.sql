SELECT TRIM(name) as name
FROM taxonomy_term_data
WHERE vid=? AND (name NOT IN('N/A', 'NA', 'N/D', 'ND', 'Inconnue', 'Inconnu', 'Aucun', 'Aucune'))
ORDER BY tid;
