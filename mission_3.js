// morgan_3_5をABCに適用（10つに期間を分割して、その時に最大利益が出るものを使う）

// その期間の利益を算出する関数（この出力を３つで毎期間比較する）
var show_profit = function(min_time, max_time, stock, start_money) {
    var value_at_sell_A = 5000
	var value_at_buy_A = 1000
	var buy_flag = true //買える！
	var sell_flag = false //売れない！
	var number_at_buy_A = 0
    var have_money = start_money
    
    for (var t = min_time; t < max_time; t++) {
        // 前後と比べて、価格が安い時間tを選ぶ（A）
        if (t == 0 || quote(stock, t - 1) >= quote(stock, t)) {
            if (t != T - 1 && quote(stock, t) < quote(stock, t + 1)) {
                var after_buy_values = [];
                var after_buy_values_2 = [];
                for (var i=1; i < 10; i++) {
                    after_buy_values.push(quote(stock, t+i));
                }
                var min_after_buy_value = after_buy_values.indexOf(Math.min.apply(null, after_buy_values));
                for(var i=1; i < min_after_buy_value; i++) {
                    after_buy_values_2.push(quote(stock, t+i));
                }
                if (Math.min.apply(null, after_buy_values) > quote(stock, t) || Math.max.apply(null, after_buy_values_2)- quote(stock, t)> Math.max.apply(null, after_buy_values_2) * 0.05) {
                        if (buy_flag) {
                            buy_flag = !buy_flag;
                            sell_flag = !sell_flag;
                            value_at_buy_A = quote(stock, t);
                            number_at_buy_A = have_money / value_at_buy_A | 0;
                            have_money = have_money - value_at_buy_A * number_at_buy_A;
                        }
                }
            }
        }

        // 前後と比べて、価格が高い時間tを選ぶ（A）:if not （直後に上がっている＆＆その手前で下がっていない場合）
        if (t != 0 && quote(stock, t - 1) < quote(stock, t)) {
            if (t == T - 1 || quote(stock, t) > quote(stock, t + 1)) {
                var after_sell_values = [];
                var after_sell_values_2 = [];
                for (var i=1; i < 6; i++) {
                    after_sell_values.push(quote(stock, t+i));
                }
                var max_after_sell_value = after_sell_values.indexOf(Math.max.apply(null, after_sell_values));
                for(var i=1; i < max_after_sell_value; i++) {
                    after_sell_values_2.push(quote(stock, t+i));
                }
                if (Math.max.apply(null, after_sell_values) < quote(stock, t) ||  t > 506 || Math.min.apply(null, after_sell_values_2) < quote(stock, t) * 0.90) {
                        var fee = quote(stock, t) * number_at_buy_A * 0.05;
                        var profit = (quote(stock, t) - value_at_buy_A) * number_at_buy_A;
                        if (fee < profit) {
                            if (sell_flag) {
                                //sell(stock, t); // 時間tで、Stockを売る
                                sell_flag = !sell_flag;
                                buy_flag = !buy_flag;
                                value_at_sell_A = quote(stock, t); 
                                have_money = have_money + value_at_sell_A * number_at_buy_A * 0.95;
                            }
                        }
                }    
            }
    	}
  	}
    return have_money - start_money
};


// その期間取引を実行する関数（選ばれた銘柄でその期間は取引を行う）
var execute_trade = function(min_time, max_time, stock, start_money) {
    var value_at_sell_A = 5000
	var value_at_buy_A = 1000
	var buy_flag = true //買える！
	var sell_flag = false //売れない！
	var number_at_buy_A = 0
    var have_money = start_money

    for (var t = min_time; t < max_time; t++) {
        // 前後と比べて、価格が安い時間tを選ぶ（A）
        if (t == 0 || quote(stock, t - 1) >= quote(stock, t)) {
            if (t != T - 1 && quote(stock, t) < quote(stock, t + 1)) {
                var after_buy_values = [];
                var after_buy_values_2 = [];
                for (var i=1; i < 10; i++) {
                    after_buy_values.push(quote(stock, t+i));
                }
                var min_after_buy_value = after_buy_values.indexOf(Math.min.apply(null, after_buy_values));
                for(var i=1; i < min_after_buy_value; i++) {
                    after_buy_values_2.push(quote(stock, t+i));
                }
                if (Math.min.apply(null, after_buy_values) > quote(stock, t) || Math.max.apply(null, after_buy_values_2)- quote(stock, t)> Math.max.apply(null, after_buy_values_2) * 0.05) {
                        if (buy_flag) {
                            buy(stock, t); // 時間tで、stockを買う
                            buy_flag = !buy_flag
                            sell_flag = !sell_flag
                            value_at_buy_A = quote(stock, t);
                            number_at_buy_A = have_money / value_at_buy_A | 0;
                            have_money = have_money - value_at_buy_A * number_at_buy_A;
                        }
                }
            }
        }

        // 前後と比べて、価格が高い時間tを選ぶ（A）:if not （直後に上がっている＆＆その手前で下がっていない場合）
        if (t != 0 && quote(stock, t - 1) < quote(stock, t)) {
            if (t == T - 1 || quote(stock, t) > quote(stock, t + 1)) {
                var after_sell_values = [];
                var after_sell_values_2 = [];
                for (var i=1; i < 6; i++) {
                    after_sell_values.push(quote(stock, t+i));
                }
                var max_after_sell_value = after_sell_values.indexOf(Math.max.apply(null, after_sell_values));
                for(var i=1; i < max_after_sell_value; i++) {
                    after_sell_values_2.push(quote(stock, t+i));
                }
                if (Math.max.apply(null, after_sell_values) < quote(stock, t) ||  t > 506 || Math.min.apply(null, after_sell_values_2) < quote(stock, t) * 0.90) {
                        var fee = quote(stock, t) * number_at_buy_A * 0.05;
                        var profit = (quote(stock, t) - value_at_buy_A) * number_at_buy_A;
                        if (fee < profit) {
                            if (sell_flag) {
                                sell(stock, t); // 時間tで、Stockを売る
                                sell_flag = !sell_flag
                                buy_flag = !buy_flag
                                value_at_sell_A = quote(stock, t); 
                                have_money = have_money + value_at_sell_A * number_at_buy_A;
                            }
                        }
                }    
            }
    	}
      }
      return have_money
};


// p1期間の比較と取引実行
var p1_A = show_profit(0, 51, A, 10000);
var p1_B = show_profit(0, 51, B, 10000);
var p1_C = show_profit(0, 51, C, 10000);
var p1_max = Math.max(p1_A, p1_B, p1_C);
if (p1_max == p1_A) {
    var next_money = execute_trade(0, 51, A, 10000);
} else if (p1_max == p1_B) {
    var next_money = execute_trade(0, 51, B, 10000);
} else {
    var next_money = execute_trade(0, 51, C, 10000);
}

// p2期間の比較と取引実行
var p2_A = show_profit(51, 100, A, next_money);
var p2_B = show_profit(51, 100, B, next_money);
var p2_C = show_profit(51, 100, C, next_money);
var p2_max = Math.max(p2_A, p2_B, p2_C);
if (p2_max == p2_A) {
    next_money = execute_trade(51, 100, A, next_money);
} else if (p2_max == p2_B) {
    next_money = execute_trade(51, 100, B, next_money);
} else {
    next_money = execute_trade(51, 100, C, next_money);
}

// p3期間の比較と取引実行
var p3_A = show_profit(100, 151, A, next_money);
var p3_B = show_profit(100, 151, B, next_money);
var p3_C = show_profit(100, 151, C, next_money);
var p3_max = Math.max(p3_A, p3_B, p3_C);
if (p3_max == p3_A) {
    next_money = execute_trade(100, 151, A, next_money);
} else if (p3_max == p3_B) {
    next_money = execute_trade(100, 151, B, next_money);
} else {
    next_money = execute_trade(100, 151, C, next_money);
}

// p4期間の比較と取引実行
var p4_A = show_profit(151, 200, A, next_money);
var p4_B = show_profit(151, 200, B, next_money);
var p4_C = show_profit(151, 200, C, next_money);
var p4_max = Math.max(p4_A, p4_B, p4_C);
if (p4_max == p4_A) {
    next_money = execute_trade(151, 200, A, next_money);
} else if (p4_max == p4_B) {
    next_money = execute_trade(151, 200, B, next_money);
} else {
    next_money = execute_trade(151, 200, C, next_money);
}

// p5期間の比較と取引実行
var p5_A = show_profit(200, 251, A, next_money);
var p5_B = show_profit(200, 251, B, next_money);
var p5_C = show_profit(200, 251, C, next_money);
var p5_max = Math.max(p5_A, p5_B, p5_C);
if (p5_max == p5_A) {
    next_money = execute_trade(200, 251, A, next_money);
} else if (p5_max == p5_B) {
    next_money = execute_trade(200, 251, B, next_money);
} else {
    next_money = execute_trade(200, 251, C, next_money);
}

// p6期間の比較と取引実行
var p6_A = show_profit(251, 300, A, next_money);
var p6_B = show_profit(251, 300, B, next_money);
var p6_C = show_profit(251, 300, C, next_money);
var p6_max = Math.max(p6_A, p6_B, p6_C);
if (p6_max == p6_A) {
    next_money = execute_trade(251, 300, A, next_money);
} else if (p6_max == p6_B) {
    next_money = execute_trade(251, 300, B, next_money);
} else {
    next_money = execute_trade(251, 300, C, next_money);
}

// p7期間の比較と取引実行
var p7_A = show_profit(300, 351, A, next_money);
var p7_B = show_profit(300, 351, B, next_money);
var p7_C = show_profit(300, 351, C, next_money);
var p7_max = Math.max(p7_A, p7_B, p7_C);
if (p7_max == p7_A) {
    next_money = execute_trade(300, 351, A, next_money);
} else if (p7_max == p7_B) {
    next_money = execute_trade(300, 351, B, next_money);
} else {
    next_money = execute_trade(300, 351, C, next_money);
}

// p8期間の比較と取引実行
var p8_A = show_profit(351, 400, A, next_money);
var p8_B = show_profit(351, 400, B, next_money);
var p8_C = show_profit(351, 400, C, next_money);
var p8_max = Math.max(p8_A, p8_B, p8_C);
if (p8_max == p8_A) {
    next_money = execute_trade(351, 400, A, next_money);
} else if (p8_max == p8_B) {
    next_money = execute_trade(351, 400, B, next_money);
} else {
    next_money = execute_trade(351, 400, C, next_money);
}

// p9期間の比較と取引実行
var p9_A = show_profit(400, 451, A, next_money);
var p9_B = show_profit(400, 451, B, next_money);
var p9_C = show_profit(400, 451, C, next_money);
var p9_max = Math.max(p9_A, p9_B, p9_C);
if (p9_max == p9_A) {
    next_money = execute_trade(400, 451, A, next_money);
} else if (p9_max == p9_B) {
    next_money = execute_trade(400, 451, B, next_money);
} else {
    next_money = execute_trade(400, 451, C, next_money);
}

// p10期間の比較と取引実行
var p10_A = show_profit(451, 512, A, next_money);
var p10_B = show_profit(451, 512, B, next_money);
var p10_C = show_profit(451, 512, C, next_money);
var p10_max = Math.max(p10_A, p10_B, p10_C);
if (p10_max == p10_A) {
    next_money = execute_trade(451, 512, A, next_money);
} else if (p10_max == p10_B) {
    next_money = execute_trade(451, 512, B, next_money);
} else {
    next_money = execute_trade(451, 512, C, next_money);
}