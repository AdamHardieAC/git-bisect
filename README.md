## Bisect Training - the good, the bad and the regression?

- The purpose of this repository is to explore the details around `git bisect`, why it's useful, where it's useful and how to use it to effectively.


`git bisect` is essentially a binary search on a commit history, it's especially useful to identify a specific commit in which a regression/bug/problem was introduced.

First you begin by marking a `bad` commit. This tells our bisect process where the regression definitely exists, meaning we know the problem exists at this point.

Next you will mark a `good` commit. This tells our bisect process where the regression definitely isn't present, meaning we know there's no problems at this point in the commit tree.

With our assigned `good` & `bad` commits, we can reasonably assume that the problem was introduced between these 2 points in our history. 


`git bisect start` - begins the bisect process.

`git bisect bad <SHA-value>` - indicates the commit of `<SHA-value>` contains the problem. (if no `<SHA-value>` is provided, it will default to your local `HEAD`).

`git bisect good <SHA-value>` - indicates that the commit of `<SHA-value>` does not contain the problem, thereby assuming that the issue must be due to a commit between the `good` and the `bad` commits respectively.