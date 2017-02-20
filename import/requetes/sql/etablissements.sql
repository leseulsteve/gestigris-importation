SELECT
    n.nid AS id,
    TRIM(n.title) AS name,
    adr.field_adresse_thoroughfare AS street,
    adr.field_adresse_locality AS city,
    adr.field_adresse_postal_code AS postalCode,
    adr.field_adresse_administrative_area AS province,
    TRIM(ttd.name) AS type,
    IF(ttd2.name IN ('N/A', 'NA', 'N/D', 'ND', 'Inconnue', 'Inconnu', 'Aucun', 'Aucune'), NULL, TRIM(ttd2.name)) AS commissionScolaire,
    cour.field_adresse_courriel_email AS email,
    s.field_site_internet_url AS url,
    geo.field_geofield_lat AS lat,
    geo.field_geofield_lon AS lon,
    na.field_notes_admin_value AS notes

FROM
    node n
        LEFT JOIN
    field_data_field_adresse adr ON n.nid = adr.entity_id
        LEFT JOIN
    field_data_field_adresse_courriel cour ON n.nid = cour.entity_id
        LEFT JOIN
    field_data_field_site_internet s ON n.nid = s.entity_id
        LEFT JOIN
    field_data_field_geofield geo ON n.nid = geo.entity_id
        LEFT JOIN
    field_data_field_notes_admin na ON n.nid = na.entity_id
        LEFT JOIN
    field_data_field_type_etablissement te ON n.nid = te.entity_id
        LEFT JOIN
    taxonomy_term_data ttd ON te.field_type_etablissement_tid = ttd.tid
        LEFT JOIN
    field_data_field_commission_scolaire cs ON n.nid = cs.entity_id
        LEFT JOIN
    taxonomy_term_data ttd2 ON ttd2.tid = cs.field_commission_scolaire_tid

WHERE
    n.type = 'etablissement_demystifications'
ORDER BY n.nid;
