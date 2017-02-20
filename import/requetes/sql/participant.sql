SELECT
  n.title AS titre
FROM
field_data_field_demystificateurs_assignes da
  LEFT JOIN
users u ON da.field_demystificateurs_assignes_target_id = users.uid
  LEFT JOIN
( SELECT
  *
  FROM
  node
  WHERE
  node.type = 'demystification' ) n ON da.entity_id = n.nid

WHERE
da.field_demystificateurs_assignes_target_id = 446
