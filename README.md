# SubGraph of EVENTS

"This repo is subpart of main repo "thegraph_nextjs_frontend_for_nft-marketplace"

# Installing TheGraph

1. Install TheGraph globally via npm or yarn.

2. Then Initialize your Graph Code.

# Creating/Writing Subgraphs

3. So, our schema.graphql file is where we're gonna define our events (you can think of this as the ActiveItem Table in the Moralis database.)

4. After defining the events in schema.graphql, we're gonna have to tell the "Subgraph" how to listen to these events in "nft-marketplace.ts"

5. run `graph codegen` which will add our data from schema to generated folder files (from where our nft-marketplace.ts file is importing the data).

   > "That means anytime we update the schema.graphql, we've have run this cmd. And this fails means you have done something wrong in schema.graphql"

6. We have to create all the logic in src folder's file, for me it's `nft-marketplace.ts`

7. If you see source in your subgraph.yaml like this-

   ```
   source:
      address: "0x304D2c04B20Df9AE2742A555C0eb942E586F8534"
      abi: NftMarketplace
    mapping: (continue...)
   ```

   That means graph is telling to index our event from beginning of "Ethereum", Which we probably don't want.

   We want to index our Events right before our contract got deployed. In this case do changes like this-

   ```
   source:
      address: "0x304D2c04B20Df9AE2742A555C0eb942E586F8534"
      abi: NftMarketplace
      startBlock: 7674334
    mapping: (continue...)
   ```

   We have tell the starting from where to start indexing (which you can get from etherscan).

   > Give Previous Block no. , means If the no. is 2 then give 1.

   Now you might ask how the hell events will list before the contract deployed. For the Answer See 8th point.

8.

# Uploading / Deploying the Subgrpahs to TheGraph Protocol

9. See the "Auth & Deploy" Section on Subgraph Studio Webpage.

   i) run this cmd to Authenticate your ownerShip. `graph auth --studio "Your Deploy Key"`

   ii) run this cmd to Build the Subgraph. `graph codegen` then `graph build`

   iii) After build all the files will compile and pushed to "build" folder.

   iv) Now finally, Deploy your Subgraph with `graph deploy --studio "Your Subgraph Name"`

10. After Deploying we'll get "hash of IPFS deployed subgraph", "URL where it's deployed" and "Subgraph endpoints" for queries.

11. How to read the data from Subgraph? See this repo:-> `thegraph_nextjs_frontend_for_nft-marketplace`
