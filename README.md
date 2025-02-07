## Bisect Training - the good, the bad and the regression?

The purpose of this repository is to explore the details around `git bisect`, why it's useful, where it's useful and how to use it to effectively.

`git bisect` is essentially a binary search on a commit history, it's especially useful to identify a specific commit in which a regression/bug/problem was introduced.

1. **Mark a `bad` commit**: This tells our bisect process where the regression definitely exists, meaning we know the problem exists at this point.
2. **Mark a `good` commit**: This tells our bisect process where the regression definitely isn't present, meaning we know there's no problems at this point in the commit tree.

With our assigned `good` & `bad` commits, we can reasonably assume that the problem was introduced between these 2 points in our history. By going through the bisect process, we can narrow down which specific commit the issue was introduced, marking commits as `good` or `bad` respectively until we can pin-point a specific commit in which the problem began.

## Working example

Assume we have the following commit history (`git log --oneline`):

- `655cc94` *(HEAD -> main, origin/main) division method + test suite*
- `7c516b2` *subtraction method + test suite*
- `f6c38ca` *multiplication method + test suite*
- `931bd0c` *it's addition not add*
- `8b321ac` *more details of the process*
- `6f12ff6` *addition functionality added*

In this example, we know that the bug exists at commit `655cc94`, so we will mark that as our initial `bad` commit by running:

```sh
git bisect start
git bisect bad 655cc94
```

We also know that the bug definitely didn't exist at commit `6f12ff6`, so we will mark that commit as:

```sh
git bisect good 6f12ff6
```

Then `git bisect` picks a commit between those two endpoints (roughly in the middle) and asks you whether the selected commit is `good` or `bad`. It continues narrowing down the range until it finds the exact commit that introduced the regression/bug/problem.

In our example, it's taken us to commit `931bd0c`. After running our tests, we can see that the error we had doesn't exist, meaning this is a `good` commit and we mark it as such with:

```sh
git bisect good 931bd0c
```

After marking `931bd0c` as `good`, it takes us to commit `7c516b2` and we carry out the same process as before. After running our tests, we can see that the error happens with this commit, meaning this is a `bad` commit and we mark it as such with:

```sh
git bisect bad 7c516b2
```

At this point, it's worth looking back to our commits to assess where we're at in the process to understand how the process has worked thus far:

- `655cc94` *(HEAD -> main, origin/main) division method + test suite* - original `bad` commit
- `7c516b2` *subtraction method + test suite* - bisected `bad` commit
- `f6c38ca` *multiplication method + test suite*
- `931bd0c` *it's addition not add* - bisected `good` commit
- `8b321ac` *more details of the process*
- `6f12ff6` *addition functionality added* - original `good` commit

Based on the commits, we've still got our original `good` & `bad` commits, we also have our bisected `good` & `bad` commits. Looking at them, we can reasonably assume that between the commits of `931bd0c` & `7c516b2` the regression/bug/problem was introduced.

After marking `7c516b2` as a `bad` commit, the bisect process takes us to commit `f6c38ca`, as that's the commit between when things were `good` and when things were `bad`. By running our tests at this point, we can see that they all pass, and thus, this is a `good` commit and we mark it as one with:

```sh
git bisect good f6c38ca
```

Assessing where we're at now, it becomes a bit more clear:

- `655cc94` *(HEAD -> main, origin/main) division method + test suite* - original `bad` commit
- `7c516b2` *subtraction method + test suite* - bisected `bad` commit
- `f6c38ca` *multiplication method + test suite* - bisected `good` commit
- `931bd0c` *it's addition not add* - bisected `good` commit
- `8b321ac` *more details of the process*
- `6f12ff6` *addition functionality added* - original `good` commit

By marking this commit as good, the bisect process will narrow down to the first commit in which the problem exists, in our case:

```sh
7c516b2 is the first bad commit.
commit 7c516b2
Author: AdamHardieAC <adam.hardie@arnoldclark.com>
Date:   Fri Feb 7 11:01:32 2025 +0000

  subtraction method + test suite

src/modules/subtraction.js      | 4 ++++
src/spec/multiplication.test.js | 2 +-
src/spec/subtraction.test.js    | 5 +++++
3 files changed, 10 insertions(+), 1 deletion(-)
create mode 100644 src/modules/subtraction.js
create mode 100644 src/spec/subtraction.test.js
```

At this point, we know which commit the regression/bug/problem was introduced (commit `7c516b2`) and need to end our bisect process.

To end the bisect process, we run the command:

```sh
git bisect reset
```

This will check us out to the `HEAD` of our current branch we're on and we can take action to resolve the issue.

## Commands

- `git bisect start` - begins the bisect process.
- `git bisect bad <SHA-value>` - indicates the commit of `<SHA-value>` contains the problem (if no `<SHA-value>` is provided, it will default to your local `HEAD`).
- `git bisect good <SHA-value>` - indicates that the commit of `<SHA-value>` does not contain the problem, thereby assuming that the issue must be due to a commit between the `good` and the `bad` commits respectively.