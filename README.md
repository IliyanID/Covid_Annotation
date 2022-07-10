# Covid_Annotation ReadME

## Getting Started

0.) SSH Into CS Machine through the VSCode SSH Extension

<a href="https://code.visualstudio.com/docs/remote/ssh">Link To Extension<a/>

1.) Setting Development and Productin Enviroment Variables

<small>Only run this command within your development enviorment<small/>

   ```sh
     EXPORT PORT = 80
   ```
   
 2.) Install Required Tech Stack
 
 <small>Insure that you have node installed<small/>
 
 3.) Install Dependencies
 
   ```sh
     cd client
     mpm config set legacy-peer-deps true
     npm install 
     cd ../server
     npm config set legacy-peer-deps true
     npm install 
   ```
   
   4.) Start the development client and server separately
   
   ```sh
     cd client
     npm run start
     cd server
     npm run start
   ```
   5.) Starting Locations
   * For the cliet the application begins in client/src/components/App.tsx
   * For the server the application begins in server/RESTserver.ts
   
   ## Accessing Production Server
   
  0.) Access <a href="turing.cs.colostate.edu"> VM Managment Site</a>
  
  1.) Access VM Named Covid-19TweetAnnotation
  
  2.) Input Credentials for VM
  
   ```sh
     Username: user
     Password: password
   ```
   
   3.) Deploying the site
   
   <small>Open a terminal within the VM and run the following commands inside the git repository<small/>
   
   ```sh
     git pull
     cd client
     npm run build
     cd ../server
     npm run start
   ```
