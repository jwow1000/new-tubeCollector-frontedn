// helpful functions for us to use :))))

// get a random integer
export const randomInt = (min,max) => {
    const answer = Math.floor( ( Math.random() * (max-min) ) + min );
    return answer;
}

