SELECT
  da.field_demystificateurs_assignes_target_id AS benevole_id,
  n.nid AS intervention_id

FROM
  node n
    JOIN
  field_data_field_demystificateurs_assignes da ON n.nid = da.entity_id

WHERE
  n.type = 'demystification'
