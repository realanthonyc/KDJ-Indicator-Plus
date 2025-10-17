// This Pine Script® code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Anthony C. https://x.com/anthonycxc

//@version=6
// -----------------------------------------------------------------------------
//  KDJ Indicator Plus
//  v1.1.3
// -----------------------------------------------------------------------------
indicator("KDJ Indicator Plus", shorttitle="KDJ", overlay=false)

// Inputs
period = input.int(9, "Period")
signal = input.int(3, "Signal")

// Core calc
hi  = ta.highest(high, period)
lo  = ta.lowest(low,  period)
rng = hi - lo
rsv = rng == 0 ? 0.0 : (close - lo) / rng * 100.0

// Wilder smoothing
K = ta.rma(rsv, signal)
D = ta.rma(K,   signal)
J = 3.0 * K - 2.0 * D

// Background
bgcolor(J > D ? color.new(color.green, 92) : color.new(color.red, 100))

// Guides
hline(80, "Upper",  color=color.new(color.aqua, 30), linestyle=hline.style_dashed)
hline(50, "Middle", color=color.new(color.aqua, 30), linestyle=hline.style_dashed)
hline(20, "Lower",  color=color.new(color.aqua, 30), linestyle=hline.style_dashed)

// Plotting
plot(K, "K", color=color.new(color.orange, 30), linewidth=1)
plot(D, "D", color=color.new(color.aqua, 50), linewidth=2)
plot(J, "J", color=color.new(color.fuchsia, 30), linewidth=1)