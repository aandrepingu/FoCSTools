function simpleProdStep(prods: string[], match: string): [number, string][]{
    let ret: [number, string][] = []
    // Using index recursion to keep better track of prods and returns
    for (let i = 0; i<prods.length; i++){
        let decomp = prods[i].split("S");
        // Four cases, Sx, xS, x, xSx
        // x
        if (decomp.length==1){
            if (match==decomp[0]){
                ret.push([i,""]);
            }
        }
        // Sx and xS
        else if (decomp.length==2){
            // Sx
            if (decomp[0]==""){
                if(match.endsWith(decomp[1])){
                    ret.push([i,match.slice(0,-decomp[1].length)]);
                }
            }
            // xS
            else if (decomp[1]==""){
                if(match.startsWith(decomp[0])){
                    ret.push([i,match.slice(decomp[0].length)]);
                }
            }
            // xSx
            else {
                if(match.startsWith(decomp[0]) && match.endsWith(decomp[1])){
                    ret.push([i,match.slice(decomp[0].length,-decomp[1].length)]);
                }
            }
        }
        
    }
    // TODO Optimize outputs (remove duplicate rest strings)
    return ret;
}

function simpleProd(prods: string[], match){
    // Our prods have no duplication now so this should be easier. Lets create an array so we don't need recursion
    let recurse: [number, string][][] = [];
    // Let's jumpstart our production
    let ruleStep = simpleProdStep(prods, match);
    if (ruleStep.length==0){
        return [] // SOME FAILURE
    }
    recurse.push(ruleStep)
    while(recurse.length!=0){
        console.log(recurse)
        // Lets go check out the latest entry in recurse
        let recurseLevel = recurse.slice(-1)[0];
        let recursePath = recurseLevel.slice(-1)[0];
        // We had actually solved it
        if (recursePath[1]==""){
            return recurse;
        }
        let nextRuleCandidates = simpleProdStep(prods, recursePath[1]);
        if (nextRuleCandidates.length==0){
            // This path has failed
            recurseLevel.pop();
            while(recurseLevel.length==0 && recurse.length!=0){
                // A previous path has also failed
                recurse.pop()
                if(recurse.length!=0){
                    recurseLevel = recurse.slice(-1)[0];
                    recurseLevel.pop();
                }
                
            }
        }
        else {
            recurse.push(nextRuleCandidates);
        }
    }
    return [] // SOME FAILURE
}

export default simpleProd;