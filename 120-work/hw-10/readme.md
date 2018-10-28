# Shawn Kearney

## Assignment 10 Summary

This was a pretty interesting assignment. I wanted to make a diffusion-reaction pattern completely from scratch without using p5's built-in image processing functions.

However, to my suprise, I am getting these cool mirroring effects. I am not entirely certain why this is, and I suspect that it is because I either did not do the image kernel properly, because I am using a round-robbin to deal with edges, or what. I did check to make sure that the seed pattern is not mirrored, and it isn't. These mirror patterns evolve after only a few iterations.

I'm not unhappy with this, however. It makes for some really interesting results. 

After letting it run for a long while (after it looks like it's settled), these cool halftone paisley patterns will start to evolve. No idea why this happens.

## Steps Taken
1. Looked up how to do diffusion-reaction in photoshop and researched the image kernels required
2. Worked out how best to organize things. I settled on making each pixel a "reactor element" and processed them individually
3. Got really frikkin confused over a misplaced backet
4. Adjusted the kernels for aesthetic improvement
5. Ran through a number of trials

## Issues

I had a lot of trouble with the UpdateKernel function which turned out to be a typo. I also wanted to do some kind of map function to nomalize the image to a 0 to 1 range, but was unsuccessful in finding the maximum and minimum element values. I think this would make the script overall more interesting and dynamic since there's a lot going on here that you cannot see because it's clipped out of range.
