SELECT
    n.nid AS intervention_id,
    TRIM(taxo.name) AS tag
FROM
    node n
        JOIN
    field_data_field_type_du_groupe tg ON n.nid = tg.entity_id
        JOIN
    taxonomy_term_data taxo ON tg.field_type_du_groupe_tid = taxo.tid
WHERE
    n.type = 'demystification'
ORDER BY n.nid;
