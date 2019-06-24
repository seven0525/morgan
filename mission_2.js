var before_target_stock = null;

for (var t = 0; t < T; t++) {
    var difference_array = []

    // ３つのそれぞれの上昇幅をリストに格納する
    var difference_A = quote(A, t + 1) - quote(A, t);
    difference_array.push(difference_A);

    var difference_B = quote(B, t + 1) - quote(B, t);
    difference_array.push(difference_B);

    var difference_C = quote(C, t + 1) - quote(C, t);
    difference_array.push(difference_C);

    
    // ３つの内最も上昇幅の大きいストックを選択する
    var max_difference = Math.max.apply(null, difference_array);

    
    // 最も上昇幅の大きいストック以外のストックは全て売却し、最も上昇幅の大きいストックに全掛けする
    
    
    // 1番上昇幅の大きい銘柄を特定
    if (max_difference == difference_A) {
    	var target_stock = A;
        var not_target_stock = B;
        var not_target_stock_2 = C;
    } else if (max_difference == difference_B) {
    	var target_stock = B;
        var not_target_stock = A;
        var not_target_stock_2 = C;
    } else if (max_difference == difference_C) {
    	var target_stock = C;
        var not_target_stock = B;
        var not_target_stock_2 = A;
    } else {
        sell(before_target_stock, t);
    }
    
    // 既に持っている他の銘柄があれば売却
    if (before_target_stock == not_target_stock) {
        sell(not_target_stock, t);
    } else if (before_target_stock == not_target_stock_2) {
        sell(not_target_stock_2, t);
    } else if (before_target_stock == target_stock) {
        continue;
    }
    
    buy(target_stock, t); // 時間tで、「target_stock」を全額買う（既に購入していた場合はcontinue）
    
    before_target_stock = target_stock;
 
}

