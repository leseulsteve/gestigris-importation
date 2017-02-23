SELECT
    usr.uid AS id,
    p.pid AS profile_id,
    TRIM(fn.field_prenom_value) AS prenom,
    TRIM(ln.field_nom_value) AS nomFamille,
    TRIM(usr.mail) AS email,
    usr.status AS actif,
    sexe.field_sexe_value AS sexe,
    orsex.field_orientation_sexuelle_value AS orientation,
    FORMAT(taxo.weight, 0) AS role,
    TRIM(occ.field_occupation_value) AS occupation,
    DATE(CONCAT(ddn.field_date_de_naissance_year,
                '-',
                ddn.field_date_de_naissance_month,
                '-',
                ddn.field_date_de_naissance_day)) AS dateNaissance

FROM
    profile p
        LEFT JOIN
    users usr ON p.uid = usr.uid
        LEFT JOIN
    field_data_field_prenom fn ON p.uid = fn.entity_id
        LEFT JOIN
    field_data_field_nom ln ON fn.entity_id = ln.entity_id
        LEFT JOIN
    field_data_field_sexe sexe ON p.pid = sexe.entity_id
        LEFT JOIN
    field_data_field_occupation occ ON p.pid = occ.entity_id
        LEFT JOIN
    field_data_field_orientation_sexuelle orsex ON p.pid = orsex.entity_id
        LEFT JOIN
    field_data_field_date_de_naissance ddn ON p.pid = ddn.entity_id
        LEFT JOIN
    field_data_field_niveau niv ON p.pid = niv.entity_id
		    LEFT JOIN
    taxonomy_term_data taxo ON niv.field_niveau_tid = taxo.tid
/*
		LEFT JOIN
    sexe
    LEFT JOIN
    orientaion
*/
WHERE p.type = 'profil_demystificateur'

ORDER BY id;
