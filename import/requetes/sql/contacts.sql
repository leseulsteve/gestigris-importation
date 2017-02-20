SELECT
    p.uid AS id,
    p.pid AS profile_id,
    TRIM(frstn.field_prenom_value) AS firstname,
    TRIM(lstn.field_nom_value)AS lastname,
    IF(fct.field_fonction_value IN ('N/A', 'NA', 'N/D', 'ND', 'Inconnue', 'Inconnu', 'Aucun', 'Aucune'), NULL, TRIM(fct.field_fonction_value)) AS poste,
    TRIM(usr.mail) AS email,
    bur.field_bureau_local_value AS bureau,
    nusr.field_notes_user_value AS note

FROM
    profile p
        LEFT JOIN
    field_data_field_prenom frstn ON p.uid = frstn.entity_id
        LEFT JOIN
    field_data_field_nom lstn ON frstn.entity_id = lstn.entity_id
        LEFT JOIN
    users usr ON p.uid = usr.uid
        LEFT JOIN
    field_data_field_fonction fct ON p.pid = fct.entity_id
        LEFT JOIN
    field_data_field_bureau_local bur ON p.pid = bur.entity_id
        LEFT JOIN
    field_data_field_notes_user nusr ON p.uid = nusr.entity_id

WHERE
    p.type = 'contact_tablissement'
