# TuringMachine
Simple Turing Machine Interpreter
Can be found at: https://tlls.tk/TuringMachine/

# Examples for unary numbers

## x + y

> A1 > B=R  
B1 > B1R  
B+ > Z1  

## x - y

> A0 > B0L  
A1 > A1R  
A* > A*R  
B1 > C0L  
B* > Z0  
C0 > D0R  
C1 > C1L  
C* > C*L  
D1 > E0R  
D* > Z1  
E1 > A1R   
E* > Z0  

## 1 - x (positive numbers)

> A1 > B1R  
B1 > C1L  
C0 > C0R  
C1 > Z-  
B0 > D0L  
D1 > D0L  
D0 > Z0  

## 1 - X (all numbers)

> A1 > B1R  
A0 > Z0  
A- > B-R  
B1 > C1L  
C0 > C0R  
C1 > Z-  
C- > Z1  
B0 > D0L  
D1 > Z0  

## | A x B = | 

> A1 > A1R  
Ax > BxR  
A| > A|R  
B1 > CaR  
C1 > C1L  
Cx > DxL  
C= > C=L  
Ca > CaL  
D1 > EaR  
Da > DaL  
D| > G|R  
E1 > E1R  
Ex > ExR  
E= > E=R  
Ea > EaR  
E| > F1R  
F0 > C|L  
Gx > HxR  
Ga > G1R  
H1 > CaR  
H= > I=L  
Ha > HaR  
Ix > Zx  
Ia > I1L  
