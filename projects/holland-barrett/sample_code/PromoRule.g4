grammar PromoRule;

/*
 * Antlr4 Grammar for Promo Engine DSL
 * Example: WHEN count(category='Vitamins') >= 3 THEN discount(cheapest, 100%)
 */

parse
    : expression EOF
    ;

expression
    : 'WHEN' condition 'THEN' action
    ;

condition
    : 'count' '(' selector ')' operator INT
    | 'total' '(' selector ')' operator DECIMAL
    ;

selector
    : 'category' '=' STRING
    | 'brand' '=' STRING
    | 'all'
    ;

action
    : 'discount' '(' target ',' percentage ')'
    ;

target
    : 'cheapest'
    | 'most_expensive'
    | 'all'
    ;

percentage
    : INT '%'
    ;

operator
    : '>=' | '<=' | '>' | '<' | '='
    ;

INT : [0-9]+ ;
DECIMAL : [0-9]+ '.' [0-9]+ ;
STRING : '\'' .*? '\'' ;
WS : [ \t\r\n]+ -> skip ;
