# Proxy Pattern

# Applicability
* Lazy initialization (virtual proxy). When you have a heavyweight object that loads data from a filesystem, network or database.
* Access control (protection proxy). When a program has different user types and you want to protect an object from the unauthorized usage. For instance, when objects are crucial parts of an operating system and programs (including malicious ones) are their clients.
* Local execution of a remote service (remote proxy). When a real service object is located on a remote server.
* Caching objects ("smart" reference). When you need to cache the results of client requests and manage their life cycle (when the results are heavyweight).
* Request logging (logging proxy). When you need to keep a history of requests to a service object.