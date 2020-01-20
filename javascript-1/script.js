function sum(a) {
    if (a == undefined)
        return 0;

    function innerFunc(b) {
        if (b == undefined)
            return a;
        else
            a += b;
        return innerFunc;
    }

    return innerFunc;
}
