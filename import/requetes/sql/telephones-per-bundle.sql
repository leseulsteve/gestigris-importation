SELECT
    t.entity_id AS entityID,
    TRIM(t.field_telephone_first) AS description,
    t.field_telephone_second AS no
FROM
    field_data_field_telephone t
WHERE
    t.bundle = ?
ORDER BY
    t.entity_id;
