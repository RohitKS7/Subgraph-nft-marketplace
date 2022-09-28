# SubGraph of EVENTS

"This repo is subpart of main repo "thegraph_nextjs_frontend_for_nft-marketplace"

1. Install TheGraph globally via npm or yarn.

2. Then Initialize your Graph Code.

3. So, our schema.graphql file is where we're gonna define our events (you can think of this as the ActiveItem Table in the Moralis database.)

4. After defining the events in schema.graphql, we're gonna have to tell the "Subgraph" how to listen to these events in "nft-marketplace.ts"

5. run `graph codegen` which will add our data from schema to generated folder files (from where our nft-marketplace.ts file is importing the data).
   > "That means anytime we update the schema.graphql, we've have run this cmd. And this fails means you have done something wrong in schema.graphql"
