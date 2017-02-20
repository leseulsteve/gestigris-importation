SELECT
  n.nid AS id,
  DATE(d.field_date_value) AS date ,
  d.field_date_value AS startTime,
  d.field_date_value2 AS endTime,
  etab.field_etablissement_target_id AS etablissement_id,
  c.field_contact_target_id AS contact_id,
  ldr.field_lieu_de_rencontre_value AS lieuRencontre,
  rg.field_responsable_du_groupe_value AS responsableGroupe,
  loc.field_local_value AS local,
  ntadmin.field_notes_admin_value AS notesAdmin,
  ntpub.field_notes_public_value AS notesPublic

FROM
  node n
    LEFT JOIN
  field_data_field_etablissement etab ON n.nid = etab.entity_id
    LEFT JOIN
  field_data_field_date d ON n.nid = d.entity_id
    LEFT JOIN
  field_data_field_contact c ON n.nid = c.entity_id
    LEFT JOIN
  field_data_field_lieu_de_rencontre ldr ON n.nid = ldr.entity_id
    LEFT JOIN
  field_data_field_responsable_du_groupe rg ON n.nid = rg.entity_id
    LEFT JOIN
  field_data_field_local loc ON n.nid = loc.entity_id
    LEFT JOIN
  field_data_field_notes_admin ntadmin ON n.nid = ntadmin.entity_id
    LEFT JOIN
  field_data_field_notes_public ntpub ON n.nid = ntpub.entity_id

WHERE
  n.type = 'demystification'

ORDER BY
  etablissement_id, DATE

-- TIME_FORMAT(d.field_date_value, '%H:%i')
