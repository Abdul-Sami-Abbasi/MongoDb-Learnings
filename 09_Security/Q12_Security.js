/*
Q12: MongoDB Security (Authentication, Authorization, Encryption)

📌 Definition:
MongoDB Security protects data from unauthorized access using:
1. Authentication → verifies who the user is.
2. Authorization → controls what actions they can perform.
3. Encryption → protects data in transit and at rest.

📌 Concepts:

1. Authentication:
- Default method: SCRAM-SHA-256 (username/password).
- Others: x.509 Certificates, LDAP, Kerberos.
- Enable in mongod.conf:
    security:
      authorization: enabled

2. Authorization:
- Role-Based Access Control (RBAC).
- Common roles:
    read, readWrite, dbAdmin, userAdmin, clusterAdmin.

3. Encryption:
a) In Transit → TLS/SSL (protects client ↔ server communication).
b) At Rest → Encrypted Storage Engine (MongoDB Enterprise) or disk-level encryption.

📌 Best Practices:
- Avoid using default ports (27017).
- Use firewalls & allow only trusted IPs.
- Store secrets in environment variables.
- Regularly update MongoDB.
- Assign minimum roles required (principle of least privilege).
*/

// ----------------------
// Authentication Example
// ----------------------
use admin
db.createUser({
  user: "samiAdmin",
  pwd: "securePass123",
  roles: ["userAdminAnyDatabase", "dbAdmin", "readWrite"]
})

// Login Example (CLI)
mongo -u samiAdmin -p securePass123 --authenticationDatabase admin

// ----------------------
// Authorization Example
// ----------------------
use ecommerce
db.createUser({
  user: "ecomUser",
  pwd: "ecomPass",
  roles: [{ role: "readWrite", db: "ecommerce" }]
})

// ----------------------
// Encryption In Transit (TLS/SSL) Example
// ----------------------
// Start mongod with TLS
// mongod --tlsMode requireTLS --tlsCertificateKeyFile server.pem --tlsCAFile ca.pem

// Connect with TLS
// mongo --tls --tlsCAFile ca.pem --tlsCertificateKeyFile client.pem
