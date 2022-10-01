def factorial(number):
    if number == 1:
        return 1
    return factorial(number)*factorial(number -1)


def T_factorial(number, accum=1):
    if number == 1:
        return accum
    else:
        return factorial(number - 1, accum * number)

print(T_factorial(5))