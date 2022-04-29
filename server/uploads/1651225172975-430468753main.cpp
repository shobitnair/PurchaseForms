#include<bits/stdc++.h>
using namespace std;

const int inf = 1000000;

// Initital topology and its cost matrix.
int TIME = 0;
int n = 5;
string id = "ABCDE";
vector<vector<int>> cost = {
    {0,1,inf,inf,1},
    {1,0,1,inf,inf},
    {inf,1,0,1,inf},
    {inf,inf,1,0,1},
    {1,inf,inf,1,0}
};

// node class of an individual router table entity.
struct node {
    int distance;
    int from;
};

// utility function to print time.
void printTime(){
    cout<<"\n\n**************************************"<<endl;
    cout<<">> TIME : "<<TIME<<endl;
}

// utility function to print routing table
void printRoute(vector<vector<node>> &route){
    for(int i = 0 ; i<n ; i++){
        cout<<"router : "<<id[i]<<endl;
        for(int j = 0 ; j<n ; j++){
            if(route[i][j].distance != inf)cout<<"\tCost to reach "<<id[j]<<" is "<<route[i][j].distance<<" via "<<id[route[i][j].from]<<endl;
            else cout<<"\tNo path is discovered yet to reach "<<id[j]<<endl;
        }
    }
}


// utility function to run distance vector routing algorithm.
void DVRA(vector<vector<node>> &route){
    while(true){
        int flag = 0;

        // Message is send from node i to node j ( its neighbor).
        // All routes from node j -> k are updated using route table of node i.
        for(int i = 0 ; i<n ; i++){
            for(int j = 0 ; j<n ; j++){
                if(cost[i][j] == 1){
                    for(int k = 0 ; k<n ; k++){
                        int new_dist = route[j][i].distance + route[i][k].distance;
                        if(new_dist < route[j][k].distance){
                            route[j][k] = {new_dist , i};
                            flag++;
                        }
                    }
                }
            }
        }
        TIME++;
        if(flag == 0){
            printTime();
            cout<<"Network is stablilized"<<endl;
            break;
        }
        printTime();
        printRoute(route);
    }
}

// utility function to break the links and make necesarry routing table changes.
void breakLink(vector<vector<node>> &route){
    TIME++;
    printTime();
    cout<<"LINK BREAKS between router B and C"<<endl;
    route[1][2] = {inf , 2};
    route[2][1] = {inf , 1};
    cost[1][2] = inf;
    cost[2][1] = inf;
    // reset all distances that move via B and C.

    
    for(int i = 0 ; i<n ; i++){
        for(int j = 0 ; j<n ; j++){
            if(route[i][j].distance < 2)continue;
            if(route[i][j].from == 1 || route[i][j].from == 2){
                route[i][j].distance = inf;
            }
        }
    }
    printRoute(route);
}

int main(){
    cout<<".......Exporting data to output.txt"<<endl;
    freopen("output.txt", "w", stdout);
    // 2d route table with node as its struct parameter.
    // route[i][j].distance => distance to reach from node i to node j.
    // route[i][j].from => the next hop taken from node i to reach node j.
    vector<vector<node>> route(5 , vector<node> (5)); 
    for(int i = 0 ; i<n ; i++){
        for(int j = 0 ; j<n ; j++){
            route[i][j] = {cost[i][j] , j};
        }
    }

    // print the initial state.
    printTime();
    printRoute(route);

    // Run the DVR algorithm on intial topology , break the links and then again run the same on new topology.
    DVRA(route);
    breakLink(route);
    DVRA(route);
}