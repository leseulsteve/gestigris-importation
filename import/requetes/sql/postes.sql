SELECT DISTINCT
    TRIM(field_fonction_value) AS description
FROM
    field_data_field_fonction
WHERE
    TRIM(field_fonction_value) NOT IN('N/A', 'NA', 'N/D', 'ND', 'Inconnue', 'Inconnu', 'Aucun', 'Aucune')
