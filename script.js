// PENALTY MASTER: Nâng cấp với 50 câu hỏi và trợ giúp!
// === CẤU HÌNH SUPABASE ===
const SUPABASE_URL = 'https://djkmfemvlscwhuflghsm.supabase.co'.trim();
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqa21mZW12bHNjd2h1ZmxnaHNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MTczMDAsImV4cCI6MjA5MTI5MzMwMH0.xgtNymE3c8J1Da-BdsHMn4gVmM3FGGYfb1ZbOvVYq7w'.trim();

let supabaseClient;
try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("Supabase Client đã khởi tạo thành công!");
} catch (e) {
    console.error("Lỗi khởi tạo Supabase:", e);
    alert("Không thể kết nối với Supabase. Hãy kiểm tra lại URL và Key!");
}
// =========================

// Ngân hàng 50 câu hỏi Python
const questionBank = [
    { m: "In ra chuỗi 'Hello'", r: /print\s*\(\s*['\"]Hello['\"]\s*\)/, h: "Sử dụng hàm print('Hello')", w: "Nhà thông thái: 'Bạn cần hàm print và nội dung nằm trong ngoặc nháy nhé!'" },
    { m: "In ra số 2026", r: /print\s*\(\s*2026\s*\)/, h: "print(2026)", w: "Số thì không cần dấu nháy đâu em!" },
    { m: "In giá trị của biến x", r: /print\s*\(\s*x\s*\)/, h: "print(x)", w: "Nhà thông thái: 'In biến thì chỉ cần bỏ tên biến vào ngoặc thôi.'" },
    { m: "In nhiều giá trị: 'A' và 'B'", r: /print\s*\(\s*['\"]A['\"]\s*,\s*['\"]B['\"]\s*\)/, h: "print('A', 'B')", w: "Dùng dấu phẩy để in nhiều thứ cùng lúc nhé." },
    { m: "Tạo biến x có giá trị 5", r: /\bx\s*=\s*5\b/, h: "x = 5", w: "Dùng dấu = để gán giá trị cho biến." },
    { m: "Tạo biến y có giá trị 20", r: /\by\s*=\s*20\b/, h: "y = 20", w: "Tên biến bên trái, giá trị bên phải." },
    { m: "Gán giá trị biến y cho x", r: /\bx\s*=\s*y\b/, h: "x = y", w: "Lệnh này sẽ copy giá trị từ y sang x." },
    { m: "Tạo biến name là 'Python'", r: /name\s*=\s*['\"]Python['\"]/, h: "name = 'Python'", w: "Chuỗi ký tự bắt buộc phải có dấu nháy." },
    { m: "Thực hiện phép cộng 2 + 3", r: /2\s*\+\s*3/, h: "2 + 3", w: "Dùng dấu + thông thường thôi." },
    { m: "Thực hiện phép trừ 5 - 2", r: /5\s*-\s*2/, h: "5 - 2", w: "Toán tử trừ là dấu gạch ngang -." },
    { m: "Thực hiện phép nhân 4 nhân 3", r: /4\s*\*\s*3/, h: "Sử dụng dấu *", w: "Lưu ý: Trong lập trình nhân là dấu sao *." },
    { m: "Thực hiện phép chia 10 cho 2", r: /10\s*\/\s*2/, h: "Sử dụng dấu /", w: "Phép chia dùng dấu xuyệt phải /." },
    { m: "Chia lấy phần nguyên 10 cho 3", r: /10\s*\/\/\s*3/, h: "Sử dụng dấu //", w: "Dùng hai dấu // để lấy phần nguyên (ví dụ 10//3 được 3)." },
    { m: "Chia lấy phần dư 10 cho 3", r: /10\s*%\s*3/, h: "Sử dụng dấu %", w: "Dấu % giúp lấy phần dư của phép chia." },
    { m: "Tính lũy thừa 2 mũ 3", r: /2\s*\*\*\s*3/, h: "Sử dụng dấu **", w: "Dùng hai dấu sao ** để tính số mũ nhé." },
    { m: "Tạo một chuỗi tên 'python'", r: /['\"]python['\"]/, h: "Bao quanh bởi dấu nháy", w: "Chuỗi có thể dùng nháy đơn hoặc nháy kép." },
    { m: "Nối chuỗi 'abc' và 'def'", r: /['\"]abc['\"]\s*\+\s*['\"]def['\"]/, h: "'abc' + 'def'", w: "Dùng dấu + để dính các chuỗi lại với nhau." },
    { m: "Đếm số ký tự trong chuỗi 'code'", r: /len\s*\(\s*['\"]code['\"]\s*\)/, h: "len('code')", w: "len là viết tắt của length (độ dài)." },
    { m: "Lặp lại chuỗi 'Hi' 3 lần", r: /['\"]Hi['\"]\s*\*\s*3/, h: "'Hi' * 3", w: "Dấu * với chuỗi sẽ làm nó lặp lại." },
    { m: "Viết hoa chuỗi s", r: /s\.upper\s*\(\s*\)/, h: "s.upper()", w: "Hàm .upper() sẽ biến tất cả thành chữ hoa." },
    { m: "Hàm nhập dữ liệu từ phím", r: /input\s*\(\s*\)/, h: "Sử dụng input()", w: "Hàm này dùng để nhận tương tác từ người dùng." },
    { m: "Gán x bằng dữ liệu nhập vào", r: /\bx\s*=\s*input\s*\(\s*\)/, h: "x = input()", w: "Nhà thông thái: 'Đừng quên cặp ngoặc đơn sau input nhé!'" },
    { m: "Nhập kèm lời mời 'Nhập tên:'", r: /input\s*\(\s*['\"]Nhập tên:['\"]\s*\)/, h: "input('Nhập tên:')", w: "Bạn có thể đưa lời mời vào trong hàm input." },
    { m: "Kiểm tra x có bằng 5 không", r: /\bx\s*==\s*5\b/, h: "Dùng dấu ==", w: "Một dấu = là gán, hai dấu == là so sánh bằng." },
    { m: "Kiểm tra x có khác 10 không", r: /\bx\s*!=\s*10\b/, h: "Dùng dấu !=", w: "Dấu chấm than và dấu bằng có nghĩa là 'không bằng'." },
    { m: "Kiểm tra x lớn hơn 3", r: /\bx\s*>\s*3\b/, h: "x > 3", w: "Dùng toán tử so sánh lớn hơn >." },
    { m: "Kiểm tra x nhỏ hơn hoặc bằng 7", r: /\bx\s*<=\s*7\b/, h: "x <= 7", w: "Dấu nhỏ hơn viết trước, dấu bằng viết sau." },
    { m: "Cấu trúc if cơ bản", r: /if\s+.+:/, h: "if điều_kiện:", w: "Nhà thông thái: 'Dấu hai chấm ở cuối dòng if là bắt buộc!'" },
    { m: "Nếu x bằng 5 thì...", r: /if\s+x\s*==\s*5\s*:/, h: "if x == 5:", w: "Đừng quên hai dấu bằng và dấu hai chấm nhé." },
    { m: "Kiểm tra nếu x dương (x > 0)", r: /if\s+x\s*>\s*0\s*:/, h: "if x > 0:", w: "Điều kiện nằm giữa if và dấu hai chấm." },
    { m: "Tạo dãy số từ 0 đến 4", r: /range\s*\(\s*5\s*\)/, h: "range(5)", w: "Hàm range(n) tạo dãy từ 0 đến n-1." },
    { m: "Vòng lặp for lặp 10 lần", r: /for\s+\w+\s+in\s+range\s*\(\s*10\s*\)\s*:/, h: "for i in range(10):", w: "Cấu trúc vòng lặp for cần dấu hai chấm." },
    { m: "Vòng lặp while x nhỏ hơn 5", r: /while\s+x\s*<\s*5\s*:/, h: "while x < 5:", w: "While sẽ lặp chừng nào điều kiện còn đúng." },
    { m: "Tạo một list rỗng tên a", r: /\ba\s*=\s*\[\s*\]/, h: "a = []", w: "Dùng ngoặc vuông [] để tạo danh sách." },
    { m: "Tạo list có 3 số: 1, 2, 3", r: /\[\s*1\s*,\s*2\s*,\s*3\s*\]/, h: "[1, 2, 3]", w: "Các phần tử ngăn cách nhau bởi dấu phẩy." },
    { m: "Thêm số 10 vào cuối list a", r: /a\.append\s*\(\s*10\s*\)/, h: "a.append(10)", w: "Hàm .append() dùng để thêm phần tử vào list." },
    { m: "Xóa hết các phần tử trong list a", r: /a\.clear\s*\(\s*\)/, h: "a.clear()", w: "Clear sẽ làm sạch danh sách của bạn." },
    { m: "Lấy phần tử đầu tiên của list a", r: /a\s*\[\s*0\s*\]/, h: "a[0]", w: "Trong Python, vị trí đầu tiên là số 0." },
    { m: "Định nghĩa hàm tên 'hello'", r: /def\s+hello\s*\(\s*\)\s*:/, h: "def hello():", w: "Dùng từ khóa def để tạo hàm mới." },
    { m: "Gọi thực thi hàm hello()", r: /hello\s*\(\s*\)/, h: "hello()", w: "Viết tên hàm kèm cặp ngoặc để chạy nó." },
    { m: "Ép kiểu x sang số nguyên", r: /int\s*\(\s*x\s*\)/, h: "int(x)", w: "Hàm int() giúp chuyển đổi sang kiểu số nguyên." },
    { m: "Ép kiểu x sang số thực", r: /float\s*\(\s*x\s*\)/, h: "float(x)", w: "Hàm float() dùng cho số thập phân." },
    { m: "Ép kiểu x sang chuỗi", r: /str\s*\(\s*x\s*\)/, h: "str(x)", w: "Hàm str() biến mọi thứ thành chữ." },
    { m: "Viết một dòng ghi chú (comment)", r: /#.+/, h: "Dùng dấu #", w: "Bất cứ thứ gì sau dấu # sẽ không bị máy tính chạy." },
    { m: "Giá trị Đúng trong Logic", r: /\bTrue\b/, h: "True", w: "Lưu ý: Python viết hoa chữ T trong True." },
    { m: "Giá trị Sai trong Logic", r: /\bFalse\b/, h: "False", w: "Lưu ý: Python viết hoa chữ F trong False." },
    { m: "Kiểm tra kiểu dữ liệu của x", r: /type\s*\(\s*x\s*\)/, h: "type(x)", w: "Hàm type giúp bạn biết x là số hay chuỗi." },
    { m: "Thoát vòng lặp lập tức", r: /\bbreak\b/, h: "break", w: "Dùng lệnh break để dừng vòng lặp ngay chưa cần xong." }
];

// Fallback trắc nghiệm Module 1 (lấy theo nội dung module_1.json)
const module1McqFallback = [
    { q: "Lệnh nào dùng để in ra màn hình?", opts: ["show()", "print()", "input()", "write()"], ans: 1 },
    { q: "Lệnh nào dùng để nhập dữ liệu từ bàn phím?", opts: ["get()", "scan()", "input()", "read()"], ans: 2 },
    { q: "Biến nào sau đây là hợp lệ?", opts: ["1so", "so-1", "so_1", "so 1"], ans: 2 },
    { q: "Kiểu dữ liệu nào là số nguyên?", opts: ["3.5", "\"3\"", "3", "'3.0'"], ans: 2 },
    { q: "Toán tử nào dùng để so sánh bằng?", opts: ["=", "==", "!=", "<="], ans: 1 },
    { q: "Vòng lặp nào dùng khi chưa biết trước số lần lặp?", opts: ["for", "while", "if", "elif"], ans: 1 },
    { q: "Lệnh nào thêm phần tử vào cuối danh sách?", opts: ["add()", "append()", "insert()", "push()"], ans: 1 },
    { q: "Danh sách nào hợp lệ?", opts: ["(1,2,3)", "{1,2,3}", "[1,2,3]", "<1,2,3>"], ans: 2 },
    { q: "Lệnh nào dùng để kết thúc sớm một vòng lặp?", opts: ["stop", "exit", "break", "continue"], ans: 2 },
    { q: "Hàm nào dùng để lấy độ dài của một danh sách?", opts: ["size()", "count()", "length()", "len()"], ans: 3 },
    { q: "Cấu trúc nào dùng để kiểm tra điều kiện?", opts: ["if...else", "for...in", "while", "def"], ans: 0 },
    { q: "Lệnh nào dùng để định nghĩa một hàm?", opts: ["function", "def", "func", "define"], ans: 1 },
    { q: "Kết quả của: 2 ** 3 là gì?", opts: ["6", "8", "9", "5"], ans: 1 },
    { q: "Danh sách (List) trong Python có thể chứa nhiều kiểu dữ liệu khác nhau không?", opts: ["Có", "Không", "Chỉ chứa số", "Chỉ chứa chuỗi"], ans: 0 },
    { q: "Hàm input() trả về kiểu dữ liệu gì?", opts: ["int", "string", "float", "bool"], ans: 1 }
];

// Ngân hàng câu hỏi Module 2: Cấu trúc dữ liệu & Giải thuật
const questionBank2 = [
    { m: "Thêm 'Cam' vào tập hợp (set) s", r: /s\.add\s*\(\s*['\"]Cam['\"]\s*\)/, h: "s.add('Cam')", w: "Set dùng hàm .add để thêm phần tử mới." },
    { m: "Xóa 'Táo' khỏi tập hợp s", r: /s\.remove\s*\(\s*['\"]Táo['\"]\s*\)/, h: "s.remove('Táo')", w: "Dùng .remove để xóa phần tử cụ thể." },
    { m: "Tạo dictionary d có key 'id' bằng 1", r: /d\s*=\s*\{\s*['\"]id['\"]\s*:\s*1\s*\}/, h: "d = {'id': 1}", w: "Dictionary dùng ngoặc nhọn và cặp key:value." },
    { m: "Lấy giá trị của key 'name' trong d", r: /d\s*\[\s*['\"]name['\"]\s*\]|d\.get\s*\(\s*['\"]name['\"]\s*\)/, h: "d['name'] hoặc d.get('name')", w: "Bạn có thể dùng ngoặc vuông hoặc hàm .get()." },
    { m: "Lấy danh sách tất cả các key của d", r: /d\.keys\s*\(\s*\)/, h: "d.keys()", w: "Hàm này trả về toàn bộ 'tên' các mục trong dict." },
    { m: "Kiểm tra 'age' có trong d không", r: /['\"]age['\"]\s+in\s+d/, h: "'age' in d", w: "Dùng từ khóa 'in' để kiểm tra sự tồn tại." },
    { m: "Tạo tuple t có 2 số: 10, 20", r: /t\s*=\s*\(\s*10\s*,\s*20\s*\)/, h: "t = (10, 20)", w: "Tuple dùng ngoặc đơn và không thể thay đổi sau khi tạo." },
    { m: "Lấy phần tử cuối của list a", r: /a\s*\[\s*-1\s*\]/, h: "a[-1]", w: "Chỉ số âm lùi từ cuối list lên đầu." },
    { m: "Cắt list a từ đầu đến phần tử thứ 3", r: /a\s*\[\s*:\s*3\s*\]/, h: "a[:3]", w: "Dùng kỹ thuật slicing với dấu hai chấm." },
    { m: "Đảo ngược list a", r: /a\.reverse\s*\(\s*\)/, h: "a.reverse()", w: "Dùng hàm reverse hoặc kỹ thuật slicing [::-1]." },
    { m: "Sắp xếp list a tăng dần", r: /a\.sort\s*\(\s*\)/, h: "a.sort()", w: "Hàm sort() sẽ thay đổi list gốc." },
    { m: "Hợp (union) hai tập hợp s1, s2", r: /s1\.union\s*\(\s*s2\s*\)|s1\s*\|\s*s2/, h: "s1.union(s2)", w: "Hợp là gộp tất cả phần tử không trùng lặp." },
    { m: "Giao (intersection) s1, s2", r: /s1\.intersection\s*\(\s*s2\s*\)|s1\s*&\s*s2/, h: "s1.intersection(s2)", w: "Giao là lấy các phần tử chung của cả hai." },
    { m: "Cập nhật key 'score' trong d thành 100", r: /d\s*\[\s*['\"]score['\"]\s*\]\s*=\s*100/, h: "d['score'] = 100", w: "Gán giá trị mới giống như biến thông thường." },
    { m: "Tính tổng các phần tử trong list a", r: /sum\s*\(\s*a\s*\)/, h: "sum(a)", w: "Hàm sum() cực kỳ tiện lợi trong Python." },
    { m: "Tìm số lớn nhất trong list a", r: /max\s*\(\s*a\s*\)/, h: "max(a)", w: "Sử dụng hàm max() nhé." },
    { m: "Xóa phần tử cuối list a và trả về nó", r: /a\.pop\s*\(\s*\)/, h: "a.pop()", w: "Hàm pop() mặc định xóa phần tử cuối." },
    { m: "Lồng 2 list: [1, [2, 3]]", r: /\[\s*1\s*,\s*\[\s*2\s*,\s*3\s*\]\s*\]/, h: "[1, [2, 3]]", w: "List có thể chứa các list khác bên trong." },
    { m: "Dạng List Comprehension: [i for i in a]", r: /\[\s*\w+\s+for\s+\w+\s+in\s+.*\s*\]/, h: "[i for i in range(5)]", w: "Đây là cách tạo list cực nhanh trong Python." },
    { m: "Xóa dictionary d hoàn toàn", r: /d\.clear\s*\(\s*\)/, h: "d.clear()", w: "Lệnh này làm trống mọi thứ trong dict." },
    { m: "Đếm số lần 'A' xuất hiện trong list a", r: /a\.count\s*\(\s*['\"]A['\"]\s*\)/, h: "a.count('A')", w: "Sử dụng hàm .count()." },
    { m: "Chèn 'X' vào vị trí số 1 của list a", r: /a\.insert\s*\(\s*1\s*,\s*['\"]X['\"]\s*\)/, h: "a.insert(1, 'X')", w: "Dùng .insert(vị_trí, giá_trị)." },
    { m: "Chuyển list a thành set", r: /set\s*\(\s*a\s*\)/, h: "set(a)", w: "Ép kiểu sang set sẽ loại bỏ các phần tử trùng." },
    { m: "Chuyển tuple t thành list", r: /list\s*\(\s*t\s*\)/, h: "list(t)", w: "Dùng hàm list() để chuyển đổi." },
    { m: "Câu lệnh pass (không làm gì cả)", r: /\bpass\b/, h: "pass", w: "Dùng pass khi bạn muốn để trống một khối lệnh." }
];

const questionBank3 = [
    { m: "Kết hợp 2 list k, v thành dict", r: /dict\s*\(\s*zip\s*\(\s*k\s*,\s*v\s*\)\s*\)/, h: "dict(zip(k, v))", w: "Nhà thông thái: 'Zip kết hợp, Dict chuyển đổi nhé!'" },
    { m: "Tính tuổi: nam_nay - nam_sinh", r: /nam_nay\s*-\s*nam_sinh/, h: "nam_nay - nam_sinh", w: "Đơn giản là lấy năm hiện tại trừ năm sinh thôi." },
    { m: "Nhân đôi list a dùng map và lambda", r: /map\s*\(\s*lambda\s+x\s*:\s*x\s*\*\s*2\s*,\s*a\s*\)/, h: "map(lambda x: x*2, a)", w: "Map áp dụng hàm cho từng phần tử." },
    { m: "Lấy giá trị key 'x' trong d, mặc định 0", r: /d\.get\s*\(\s*['\"]x['\"]\s*,\s*0\s*\)/, h: "d.get('x', 0)", w: "Get giúp tránh lỗi khi không tìm thấy khóa." },
    { m: "Lọc số > 5 từ list a dùng filter", r: /filter\s*\(\s*lambda\s+x\s*:\s*x\s*>\s*5\s*,\s*a\s*\)/, h: "filter(lambda x: x > 5, a)", w: "Filter giữ lại các phần tử thỏa mãn điều kiện." },
    { m: "Tạo set các số lẻ từ 1-9", r: /\{\s*x\s*for\s+x\s+in\s+range\s*\(\s*1\s*,\s*10\s*\)\s+if\s+x\s*%\s*2\s*!=\s*0\s*\}/, h: "{x for x in range(1, 10) if x%2 != 0}", w: "Set comprehension với điều kiện if." },
    { m: "Đảo ngược tuple t", r: /t\s*\[\s*:\s*:\s*-1\s*\]/, h: "t[::-1]", w: "Kỹ thuật slicing hoạt động cả với tuple." },
    { m: "Gộp 2 dict d1, d2", r: /d1\s*\|\s*d2/, h: "d1 | d2", w: "Toán tử | (union) cho dict có từ Python 3.9." },
    { m: "Giải nén ma trận matrix dùng zip", r: /zip\s*\(\s*\*\s*matrix\s*\)/, h: "zip(*matrix)", w: "Sử dụng * để giải nén hàng thành các đối số." },
    { m: "Kiểm tra chuỗi s là số", r: /s\.isdigit\s*\(\s*\)/, h: "s.isdigit()", w: "Hàm này cực kỳ hữu ích để validate dữ liệu." }
];

const questionBank4 = [
    // === CÂU HỎI TRẮC NGHIỆM (MCQ) ===
    { q: "Cấu trúc dữ liệu nào trong Python giữ THỨ TỰ phần tử và cho phép thay đổi (mutable)?", opts: ["Tuple", "Set", "List", "Frozen set"], ans: 2 },
    { q: "Cấu trúc dữ liệu nào KHÔNG cho phép phần tử trùng lặp?", opts: ["List", "Tuple", "Set", "String"], ans: 2 },
    { q: "Tuple có đặc điểm nổi bật nào?", opts: ["Không có thứ tự", "Mutable", "Immutable", "Lưu key-value"], ans: 2 },
    { q: "Dictionary lưu dữ liệu theo dạng nào?", opts: ["index-value", "key-value", "item-only", "value-key"], ans: 1 },
    { q: "Lệnh nào thêm phần tử 10 vào cuối list a?", opts: ["a.add(10)", "a.insert(10)", "a.append(10)", "a.push(10)"], ans: 2 },
    { q: "Phương thức nào thêm phần tử vào set s?", opts: ["s.append(x)", "s.add(x)", "s.insert(x)", "s.push(x)"], ans: 1 },
    { q: "Để truy cập giá trị theo key 'name' trong dict d an toàn, nên dùng?", opts: ["d.name", "d['name']", "d.get('name')", "d.fetch('name')"], ans: 2 },
    { q: "So với list, set phù hợp hơn trong bài toán nào?", opts: ["Giữ nguyên thứ tự nhập", "Truy cập theo chỉ số", "Kiểm tra tồn tại nhanh và loại trùng", "Lưu cặp key-value"], ans: 2 },
    { q: "Trong tuple t = (1, 2, 3), t[0] bằng bao nhiêu?", opts: ["0", "1", "2", "3"], ans: 1 },
    { q: "Kết quả của len({'a':1, 'b':2, 'c':3}) là gì?", opts: ["2", "3", "1", "Lỗi"], ans: 1 },
    { q: "Đâu là khai báo tuple một phần tử đúng?", opts: ["(5)", "[5]", "(5,)", "{5}"], ans: 2 },
    { q: "Phép toán nào lấy phần tử CHUNG của hai set?", opts: ["|", "&", "-", "^"], ans: 1 },
    { q: "Biểu thức nào lấy phần tử cuối list a?", opts: ["a[last]", "a[len(a)]", "a[-1]", "a(end)"], ans: 2 },
    { q: "Điều gì đúng với dictionary key?", opts: ["Có thể dùng list làm key", "Có thể trùng key", "Key phải hashable và duy nhất", "Chỉ dùng string làm key"], ans: 2 },
    { q: "Chuyển list a sang set để loại trùng dùng lệnh nào?", opts: ["list(a)", "set(a)", "tuple(a)", "dict(a)"], ans: 1 },
    { q: "Set có hỗ trợ truy cập theo chỉ số như s[0] không?", opts: ["Có, luôn luôn", "Không, vì set không có thứ tự chỉ mục", "Chỉ khi set có số", "Chỉ Python 2 mới có"], ans: 1 },
    { q: "Để cập nhật nhiều key từ dict d2 vào d1 dùng gì?", opts: ["d1.merge(d2)", "d1.add(d2)", "d1.update(d2)", "d1.append(d2)"], ans: 2 },
    { q: "So sánh đúng về list và tuple là gì?", opts: ["Cả hai đều immutable", "List immutable, tuple mutable", "List mutable, tuple immutable", "Cả hai đều chỉ chứa số"], ans: 2 },
    { q: "Để đếm tần suất phần tử trong danh sách, cấu trúc nào hay dùng nhất?", opts: ["Set", "Tuple", "Dictionary", "Float"], ans: 2 },
    { q: "Kết quả của {1,2,3} - {2} là gì?", opts: ["{2}", "{1,3}", "{1,2,3}", "{}"], ans: 1 },
    { q: "Bài toán giữ thứ tự lịch sử thao tác nên ưu tiên cấu trúc nào?", opts: ["Set", "List", "Tuple", "Boolean"], ans: 1 },
    { q: "Khi cần dữ liệu cố định không thay đổi để làm key dict, nên dùng?", opts: ["List", "Tuple", "Set", "Dictionary"], ans: 1 },
    { q: "Dictionary nào sau đây hợp lệ?", opts: ["{[1,2]: 'A'}", "{(1,2): 'A'}", "{{1,2}: 'A'}", "{ {'k':1}: 'A' }"], ans: 1 },
    { q: "Nếu muốn kiểm tra phần tử x có trong list a nhanh hơn ở dữ liệu lớn, nên làm gì?", opts: ["Chuyển sang tuple", "Chuyển sang set", "Chuyển sang string", "Nhân đôi list"], ans: 1 },
    { q: "Kết quả của tuple([1,2,3]) là gì?", opts: ["[1,2,3]", "{1,2,3}", "(1,2,3)", "{'1':2,'3':4}"], ans: 2 },
    { q: "Phát biểu nào đúng về độ phức tạp trung bình tra cứu key trong dict?", opts: ["O(n)", "O(log n)", "O(1)", "O(n^2)"], ans: 2 },
    { q: "Để lấy danh sách tất cả key trong dict d dùng gì?", opts: ["d.keys()", "d.items()", "d.values()", "d.getkeys()"], ans: 0 },
    { q: "Để lấy cả key và value khi duyệt dict d, cách nào chuẩn nhất?", opts: ["for x in d:", "for k, v in d.items():", "for v in d.values():", "for i in range(d):"], ans: 1 },
    { q: "Kết quả của [1,2,2,3] khi chuyển sang set là?", opts: ["{1,2,2,3}", "{1,2,3}", "[1,2,3]", "(1,2,3)"], ans: 1 },
    { q: "Trong so sánh tổng quan, cấu trúc nào phù hợp nhất để ánh xạ thông tin hồ sơ sinh viên theo mã số?", opts: ["List", "Tuple", "Set", "Dictionary"], ans: 3 },
    { q: "Khi cần lưu tập các môn học không trùng và thường xuyên phép giao/hợp, nên chọn?", opts: ["List", "Set", "Tuple", "Dictionary"], ans: 1 },
    { q: "Hàm nào tạo list mới đã sắp xếp từ list a mà không sửa list gốc?", opts: ["a.sort()", "sorted(a)", "a.sorted()", "sort(a, in_place=True)"], ans: 1 },
    { q: "Lệnh nào xóa và trả về value của key 'x' trong dict d?", opts: ["d.remove('x')", "d.pop('x')", "d.delete('x')", "d.cut('x')"], ans: 1 },
    { q: "Khi cần dữ liệu có thể lặp và truy cập theo index cho bài toán sliding window, cấu trúc hợp lý nhất là?", opts: ["Set", "Tuple", "List", "Dictionary"], ans: 2 },
    { q: "Cấu trúc nào sau đây không chấp nhận phần tử mutable làm phần tử con trực tiếp?", opts: ["List", "Tuple", "Set", "Dictionary"], ans: 2 },
    { q: "Kết quả của d = {'a': 1}; d.get('b', 0) là gì?", opts: ["Error", "None", "0", "'b'"], ans: 2 },
    { q: "Kết quả của [x**2 for x in range(4)] là gì?", opts: ["[1, 4, 9, 16]", "[0, 1, 4, 9]", "[0, 2, 4, 6]", "[1, 2, 3, 4]"], ans: 1 },
    { q: "Lệnh nào xóa phần tử đầu tiên có giá trị 3 trong list a?", opts: ["a.pop(3)", "a.delete(3)", "a.remove(3)", "del a(3)"], ans: 2 },
    { q: "Kết quả của a = [1,2,3]; a[1:2] là gì?", opts: ["[1, 2]", "[2]", "[2, 3]", "[1]"], ans: 1 },
    { q: "Lệnh nào chèn phần tử 99 vào vị trí index 0 của list a?", opts: ["a.insert(99, 0)", "a.insert(0, 99)", "a.add(0, 99)", "a.prepend(99)"], ans: 1 },
    { q: "Kết quả của a = [1,2,3]; a.extend([4,5]) là gì?", opts: ["[1,2,3,[4,5]]", "[1,2,3,4,5]", "[[1,2,3],4,5]", "Lỗi"], ans: 1 },
    { q: "Phương thức nào đếm số lần xuất hiện của giá trị 2 trong list a?", opts: ["a.find(2)", "a.count(2)", "a.index(2)", "a.search(2)"], ans: 1 },
    { q: "Kết quả của a = [1,2,3]; a.reverse(); print(a) là gì?", opts: ["[1,2,3]", "[3,2,1]", "None", "Lỗi"], ans: 1 },
    { q: "Kết quả của a = [1,2,3,4,5]; a[::2] là gì?", opts: ["[2, 4]", "[1, 3, 5]", "[1, 2]", "[5, 3, 1]"], ans: 1 },
    { q: "Kết quả của a = [1,2,3]; b = a; b.append(4); print(a) là gì?", opts: ["[1,2,3]", "[1,2,3,4]", "Lỗi", "[4,3,2,1]"], ans: 1 },
    { q: "Để tạo bản sao độc lập (shallow copy) của list a, cách nào đúng?", opts: ["b = a", "b = a[:]", "b = &a", "b = a.ref()"], ans: 1 },
    { q: "Kết quả của 'x' in {'x': 1, 'y': 2} là gì?", opts: ["True", "False", "1", "Lỗi"], ans: 0 },
    { q: "Lệnh nào xóa tất cả phần tử trong dict d?", opts: ["d.removeAll()", "d.clear()", "d.empty()", "del d[:]"], ans: 1 },
    { q: "Kết quả của list(range(1, 10, 3)) là gì?", opts: ["[1, 3, 6, 9]", "[1, 4, 7]", "[3, 6, 9]", "[1, 4, 7, 10]"], ans: 1 },
    { q: "Phương thức nào trả về vị trí (index) đầu tiên của giá trị 5 trong list a?", opts: ["a.find(5)", "a.index(5)", "a.search(5)", "a.pos(5)"], ans: 1 },
    { q: "Kết quả của (1, 2) + (3,) là gì?", opts: ["(1, 2, 3)", "(4, 2)", "Lỗi vì tuple immutable", "[1, 2, 3]"], ans: 0 },
    { q: "Kết quả của (1, 2, 3) * 2 là gì?", opts: ["(2, 4, 6)", "(1, 2, 3, 1, 2, 3)", "Lỗi", "(1, 2, 3, 2)"], ans: 1 },
    { q: "Phương thức nào đếm số lần xuất hiện của giá trị trong tuple?", opts: ["t.find(x)", "t.count(x)", "t.search(x)", "t.num(x)"], ans: 1 },
    { q: "Kết quả của a, b, *c = [1, 2, 3, 4, 5] thì c bằng gì?", opts: ["[3, 4, 5]", "(3, 4, 5)", "3", "[1, 2]"], ans: 0 },
    { q: "Phép toán nào lấy hợp (UNION) của hai set?", opts: ["&", "|", "-", "^"], ans: 1 },
    { q: "Kết quả của {1,2,3} ^ {2,3,4} là gì?", opts: ["{2, 3}", "{1, 4}", "{1, 2, 3, 4}", "{}"], ans: 1 },
    { q: "Phương thức nào xóa phần tử bất kỳ khỏi set và trả về nó?", opts: ["s.remove()", "s.pop()", "s.delete()", "s.take()"], ans: 1 },
    { q: "Sự khác biệt giữa s.remove(x) và s.discard(x) ở set là gì?", opts: ["Không có sự khác biệt", "remove() báo lỗi nếu x không tồn tại, discard() thì không", "discard() xóa tất cả x, remove() chỉ xóa một", "remove() trả về x, discard() không trả về"], ans: 1 },
    { q: "frozenset khác set ở điểm nào?", opts: ["frozenset nhanh hơn", "frozenset là immutable, không thêm/xóa phần tử được", "frozenset cho phép phần tử trùng", "frozenset có thứ tự"], ans: 1 },
    { q: "Kết quả của d = {}; d.setdefault('a', []).append(1); print(d) là gì?", opts: ["{'a': 1}", "{'a': [1]}", "Lỗi", "{}"], ans: 1 },
    { q: "Kết quả của {k: v for k, v in [('a',1), ('b',2)]} là gì?", opts: ["[('a',1), ('b',2)]", "{'a': 1, 'b': 2}", "{('a',1), ('b',2)}", "Lỗi"], ans: 1 },
    { q: "Trong Python 3.7+, dictionary có đảm bảo thứ tự chèn không?", opts: ["Không, dict không có thứ tự", "Có, dict giữ thứ tự chèn", "Chỉ khi dùng OrderedDict", "Chỉ khi key là số"], ans: 1 },
    { q: "Kết quả của list('hello') là gì?", opts: ["['hello']", "['h', 'e', 'l', 'l', 'o']", "('h', 'e', 'l', 'l', 'o')", "Lỗi"], ans: 1 },
    { q: "Lệnh del a[1:3] trên a = [10,20,30,40,50] cho kết quả gì?", opts: ["[10, 40, 50]", "[10, 20, 50]", "[20, 30]", "Lỗi"], ans: 0 },
    { q: "Kết quả của min([3, 1, 4, 1, 5]) là gì?", opts: ["3", "1", "5", "0"], ans: 1 },
    { q: "Kết quả của sum([1, 2, 3, 4]) là gì?", opts: ["4", "10", "24", "Lỗi"], ans: 1 },
    { q: "Lệnh nào kiểm tra set s1 là tập con của set s2?", opts: ["s1.subset(s2)", "s1.issubset(s2)", "s1.contains(s2)", "s1.in(s2)"], ans: 1 },
    { q: "Kết quả của a = [1,2,3]; a.pop() là gì?", opts: ["1", "[1,2]", "3", "Lỗi"], ans: 2 },
    { q: "Kết quả của a = [1,2,3]; a.pop(0) là gì?", opts: ["1", "3", "[2,3]", "0"], ans: 0 },
    { q: "Nested dictionary d = {'a': {'b': 5}}, cách lấy giá trị 5?", opts: ["d['a']['b']", "d['a.b']", "d.get('a.b')", "d['b']['a']"], ans: 0 },
    { q: "Kết quả của sorted({'c':3, 'a':1, 'b':2}) là gì?", opts: ["{'a':1, 'b':2, 'c':3}", "['a', 'b', 'c']", "[1, 2, 3]", "Lỗi"], ans: 1 },
    { q: "Kết quả của [i for i in range(5) if i % 2 != 0] là gì?", opts: ["[0, 2, 4]", "[1, 3]", "[1, 2, 3, 4]", "[0, 1, 2, 3, 4]"], ans: 1 },
    { q: "Hàm map(lambda x: x * 2, [1, 2, 3]) trong Python trả về kiểu dữ liệu nào?", opts: ["List", "Map object", "Set", "Tuple"], ans: 1 },
    { q: "Hàm sorted([3, 1, 2]) sẽ trả về kết quả nào?", opts: ["[1, 2, 3]", "[3, 2, 1]", "[2, 1, 3]", "Lỗi"], ans: 0 },
    { q: "Hàm filter(lambda x: x % 2 == 0, [1, 2, 3, 4]) dùng để làm gì?", opts: ["Tạo một tuple mới", "Lọc các phần tử thỏa mãn điều kiện", "Chuyển đổi kiểu dữ liệu", "Sắp xếp dữ liệu"], ans: 1 },
    { q: "Biểu thức lambda x: x + 1 có ý nghĩa là gì?", opts: ["Tạo một hàm ẩn danh trả về x + 1", "Tạo một biến x", "Kiểm tra điều kiện x > 1", "Sắp xếp x tăng dần"], ans: 0 },
    { q: "Đoạn code try: 10 / 0 except ZeroDivisionError: ... dùng để làm gì?", opts: ["Bắt và xử lý lỗi chia cho 0", "Tạo một vòng lặp mới", "In ra số 10", "Xóa biến 10"], ans: 0 },
    { q: "Trong thư viện math, câu lệnh math.sqrt(25) sẽ trả về giá trị nào?", opts: ["25", "5.0", "12.5", "Lỗi"], ans: 1 },
    { q: "Để dùng hàm sqrt trong thư viện math, ta cần viết câu lệnh nào?", opts: ["import math", "include math", "using math", "from math import list"], ans: 0 },

    // === BÀI CODE ===
    { m: "Tạo list a gồm các số 1, 2, 3, 4", r: /a\s*=\s*\[\s*1\s*,\s*2\s*,\s*3\s*,\s*4\s*\]/, h: "a = [1, 2, 3, 4]", w: "List dùng ngoặc vuông và phần tử ngăn bởi dấu phẩy." },
    { m: "Thêm số 10 vào cuối list a", r: /a\.append\s*\(\s*10\s*\)/, h: "a.append(10)", w: "append dùng để thêm phần tử vào cuối list." },
    { m: "Tạo set s từ list a", r: /s\s*=\s*set\s*\(\s*a\s*\)/, h: "s = set(a)", w: "Set loại bỏ phần tử trùng." },
    { m: "Lấy giao hai set s1 và s2", r: /s1\s*&\s*s2|s1\.intersection\s*\(\s*s2\s*\)/, h: "s1 & s2", w: "Giao là phần chung giữa hai tập." },
    { m: "Tạo tuple point có giá trị 5 và 8", r: /point\s*=\s*\(\s*5\s*,\s*8\s*\)/, h: "point = (5, 8)", w: "Tuple dùng ngoặc đơn, phù hợp dữ liệu cố định." },
    { m: "Tạo tuple một phần tử t chỉ chứa số 9", r: /t\s*=\s*\(\s*9\s*,\s*\)/, h: "t = (9,)", w: "Tuple 1 phần tử bắt buộc có dấu phẩy cuối." },
    { m: "Tạo dict student có name='Lan' và age=20", r: /student\s*=\s*\{\s*['"]name['"]\s*:\s*['"]Lan['"]\s*,\s*['"]age['"]\s*:\s*20\s*\}/, h: "student = {'name': 'Lan', 'age': 20}", w: "Dict dùng cặp key:value trong ngoặc nhọn." },
    { m: "Lấy giá trị key 'name' từ dict student", r: /student\s*\[\s*['"]name['"]\s*\]|student\.get\s*\(\s*['"]name['"]\s*\)/, h: "student['name'] hoặc student.get('name')", w: "Dùng get an toàn hơn khi có thể thiếu key." },
    { m: "Cập nhật điểm score=100 trong dict d", r: /d\s*\[\s*['"]score['"]\s*\]\s*=\s*100/, h: "d['score'] = 100", w: "Bạn có thể cập nhật trực tiếp value theo key." },
    { m: "Chuyển list a thành set rồi đếm phần tử", r: /len\s*\(\s*set\s*\(\s*a\s*\)\s*\)/, h: "len(set(a))", w: "Set là lựa chọn chuẩn để xử lý trùng lặp." },
    { m: "Lấy key-value của dict d bằng vòng lặp", r: /for\s+\w+\s*,\s*\w+\s+in\s+d\.items\s*\(\s*\)\s*:/, h: "for k, v in d.items():", w: "items() trả về cặp key-value để unpack." },
    { m: "Chuyển tuple t sang list lst", r: /lst\s*=\s*list\s*\(\s*t\s*\)/, h: "lst = list(t)", w: "list() giúp chuyển đổi để có thể chỉnh sửa dữ liệu." },
    { m: "Xóa phần tử có giá trị 3 khỏi list a", r: /a\.remove\s*\(\s*3\s*\)/, h: "a.remove(3)", w: "remove() xóa phần tử đầu tiên khớp giá trị." },
    { m: "Chèn số 99 vào vị trí index 1 của list a", r: /a\.insert\s*\(\s*1\s*,\s*99\s*\)/, h: "a.insert(1, 99)", w: "insert(index, value) chèn phần tử vào vị trí chỉ định." },
    { m: "Tạo list squares bình phương các số từ 1 đến 5", r: /squares\s*=\s*\[\s*x\s*\*\*\s*2\s+for\s+x\s+in\s+range\s*\(\s*1\s*,\s*6\s*\)\s*\]/, h: "squares = [x**2 for x in range(1, 6)]", w: "List comprehension tạo danh sách ngắn gọn." },
    { m: "Lấy hợp (union) của hai set s1 và s2", r: /s1\s*\|\s*s2|s1\.union\s*\(\s*s2\s*\)/, h: "s1 | s2", w: "Phép hợp gộp tất cả phần tử từ cả hai set." },
    { m: "Xóa key 'age' khỏi dict d bằng pop", r: /d\.pop\s*\(\s*['"]age['"]\s*\)/, h: "d.pop('age')", w: "pop(key) xóa key và trả về value tương ứng." },
    { m: "Đảo ngược list a tại chỗ", r: /a\.reverse\s*\(\s*\)/, h: "a.reverse()", w: "reverse() đảo ngược list gốc, không tạo list mới." },
    { m: "Sắp xếp list a tăng dần tại chỗ", r: /a\.sort\s*\(\s*\)/, h: "a.sort()", w: "sort() sắp xếp tại chỗ, sorted() tạo list mới." },
    { m: "Lấy 3 phần tử đầu của list a", r: /a\s*\[\s*:\s*3\s*\]/, h: "a[:3]", w: "Slice a[:n] lấy n phần tử đầu tiên." },
    { m: "Tạo dict comprehension d: key 1-5, value bình phương", r: /d\s*=\s*\{\s*x\s*:\s*x\s*\*\*\s*2\s+for\s+x\s+in\s+range\s*\(\s*1\s*,\s*6\s*\)\s*\}/, h: "d = {x: x**2 for x in range(1, 6)}", w: "Dict comprehension dùng cú pháp {key: value for ...}." },
    { m: "Nối list b = [4,5] vào cuối list a", r: /a\.extend\s*\(\s*b\s*\)/, h: "a.extend(b)", w: "extend() thêm từng phần tử của list b vào a." },
    { m: "Kiểm tra s1 có phải tập con của s2", r: /s1\.issubset\s*\(\s*s2\s*\)|s1\s*<=\s*s2/, h: "s1.issubset(s2) hoặc s1 <= s2", w: "issubset() hoặc <= kiểm tra tập con." },
    { m: "Xóa tất cả phần tử trong list a", r: /a\.clear\s*\(\s*\)/, h: "a.clear()", w: "clear() xóa tất cả phần tử, giữ lại list rỗng." }
];


let selectedModule = 1;
let activeQuestions = [];
const directions = ["Góc Trái", "Chính Giữa", "Góc Phải"];
let gameStarted = false;
let currentQuestion = 0;
let score = 0;
let lives = 3;
let shooting = false;
let helps = { call: false, wise: false };
let playerName = "L";
let playerNumber = "22";
let consecutiveCorrect = 0;
let isPowerShot = false;

const characterConfigs = [
    { name: "CR7", skin: "#c8a07a", hair: "#1a1a1a", hairStyle: 'fade', browType: 'thick', facialHair: null, faceImg: "img/face_ronaldo.png" },
    { name: "Messi", skin: "#d4a574", hair: "#2c2c2c", hairStyle: 'classic', browType: 'normal', facialHair: 'beard', faceImg: "img/face_messi.png" },
    { name: "Neymar", skin: "#c8a070", hair: "#b8860b", hairStyle: 'mohawk', browType: 'thin', facialHair: 'goatee', faceImg: "img/face_neymar.png" },
    { name: "Mbappe", skin: "#5c3317", hair: "#111", hairStyle: 'buzz', browType: 'normal', facialHair: null, faceImg: "img/face_mbappe.png" },
    { name: "Yamal", skin: "#8d5524", hair: "#1a1a1a", hairStyle: 'curly', browType: 'normal', facialHair: null, faceImg: "img/face_yamal.png" },
    { name: "DO MIXI", skin: "#d4a574", hair: "#111", hairStyle: 'pompadour', browType: null, facialHair: null, special: 'mole', faceImg: "img/face_mixi.png" }
];

// Preload face images for canvas drawing
const faceImages = {};
characterConfigs.forEach(cfg => {
    const img = new Image();
    img.src = cfg.faceImg;
    faceImages[cfg.faceImg] = img;
});
let characterIndex = 0;
let selectedShirtColor = '#DA291C'; // Default: Man United red

// Club data: màu áo truyền thống & tên hiển thị
const clubData = {
    mu: { name: 'MAN UTD', shirt: '#DA291C', number: '7', accent: '#FFE500' },
    chelsea: { name: 'CHELSEA', shirt: '#034694', number: '10', accent: '#ADBBCC' },
    liverpool: { name: 'LIVERPOOL', shirt: '#C8102E', number: '9', accent: '#F6EB61' },
    real: { name: 'REAL', shirt: '#ffffff', number: '7', accent: '#FEBE10' },
    barca: { name: 'BARCA', shirt: '#004D98', number: '10', accent: '#EDBB00' },
    juventus: { name: 'JUVENTUS', shirt: '#1e1e1e', number: '10', accent: '#c6a84d' },
    bayern: { name: 'BAYERN', shirt: '#DC052D', number: '25', accent: '#0066B2' },
    arsenal: { name: 'ARSENAL', shirt: '#EF0107', number: '14', accent: '#ffffff' }
};
let selectedClubId = 'mu';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const cw = canvas.width;
const ch = canvas.height;

const goalPos = { x: cw / 2, y: 100, w: 320, h: 180 };
const ballStart = { x: cw / 2, y: ch - 60, scale: 1 };
let ball = { ...ballStart, rotation: 0 };
let goalie = {
    x: cw / 2, y: 90, rotation: 0, state: 'idle',
    shirt: '#f1c40f', skin: '#4e342e', hair: '#111',
    name: 'ONANA', number: '24', hairStyle: 'buzz', browType: 'normal', facialHair: null,
    trail: []
};
let player = {
    x: cw / 2 - 40, y: ch - 60, state: 'idle', thought: null,
    shirt: '#e74c3c', skin: '#f3c19d', hair: '#d35400',
    name: 'NIÊN BÉO', number: '10', hairStyle: 0
};

function drawField() {
    // Pitch
    const grad = ctx.createLinearGradient(0, ch, 0, 150);
    grad.addColorStop(0, '#1e8449');
    grad.addColorStop(1, '#2ecc71');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cw, ch);

    // Markings
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(cw / 2, ballStart.y, 80, Math.PI, 0); ctx.stroke();
    // Penalty area
    ctx.strokeRect(cw / 2 - 220, 50, 440, 160);

    // Net
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= goalPos.w; i += 20) {
        ctx.moveTo(goalPos.x - goalPos.w / 2 + i, goalPos.y - goalPos.h / 2);
        ctx.lineTo(goalPos.x - goalPos.w / 2 + i, goalPos.y + goalPos.h / 2);
    }
    for (let i = 0; i <= goalPos.h; i += 20) {
        ctx.moveTo(goalPos.x - goalPos.w / 2, goalPos.y - goalPos.h / 2 + i);
        ctx.lineTo(goalPos.x + goalPos.w / 2, goalPos.y - goalPos.h / 2 + i);
    }
    ctx.stroke();

    // Posts
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 10;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeRect(goalPos.x - goalPos.w / 2, goalPos.y - goalPos.h / 2, goalPos.w, goalPos.h);

    // Scoreboard on field
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.roundRect(10, 10, 125, 100, 12); // Tăng chiều cao để hiện PowerShot
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '700 13px Outfit';
    ctx.fillText("LƯỢT: " + (currentQuestion + 1) + "/10", 20, 30);
    ctx.fillStyle = '#f1c40f';
    ctx.fillText("BÀN: " + score, 20, 48);
    ctx.fillStyle = '#e74c3c';
    let hearts = "";
    for (let i = 0; i < 3; i++) {
        hearts += (i < lives) ? "❤️" : "🖤";
    }
    ctx.fillText("TIM: " + hearts, 20, 66);

    // Power Shot indicator
    ctx.fillStyle = '#fff';
    ctx.font = '700 11px Outfit';
    ctx.fillText("POWERSHOT: ", 20, 85);
    for (let i = 0; i < 3; i++) {
        ctx.fillStyle = i < consecutiveCorrect ? '#ff4500' : '#444';
        ctx.beginPath();
        ctx.arc(95 + i * 12, 81, 4, 0, Math.PI * 2);
        ctx.fill();
        if (i < consecutiveCorrect) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff4500';
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
    }
    if (isPowerShot) {
        ctx.fillStyle = '#ff4500';
        ctx.font = '900 12px Outfit';
        ctx.fillText("🔥 SẴN SÀNG!", 20, 102);
    }
    ctx.restore();
}

function drawChibi(char, rotation = 0, scale = 1, isTrail = false) {
    const { x, y, shirt, skin, name, number, state } = char;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(rotation);

    if (isTrail) {
        ctx.globalAlpha = 0.3;
    }

    const sc = skin;
    const isGoalie = (name || "").toUpperCase() === 'ONANA';
    const isMbappe = (name || "").toUpperCase().includes("MBAPPE");
    const isMixi = (name || "").toUpperCase().includes("MIXI");

    function hexDarken(hex, factor) {
        let c = (hex || '#888888').replace('#', '');
        if (c.length === 3) c = c.split('').map(ch => ch + ch).join('');
        return `rgb(${Math.max(0, Math.round(parseInt(c.slice(0, 2), 16) * factor))},${Math.max(0, Math.round(parseInt(c.slice(2, 4), 16) * factor))},${Math.max(0, Math.round(parseInt(c.slice(4, 6), 16) * factor))})`;
    }
    function getContrastColor(hex) {
        const c = (hex || '#888888').replace('#', '');
        const r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16);
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? '#1a1a2e' : '#ffffff';
    }
    const shortsColor = hexDarken(shirt, 0.55);

    // --- Shadow ---
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath(); ctx.ellipse(0, 48, 19, 7, 0, 0, Math.PI * 2); ctx.fill();

    // --- Cleats ---
    ctx.fillStyle = '#1c1c1c';
    if (state === 'kicking') {
        ctx.beginPath(); ctx.ellipse(-8, 57, 9, 4, 0, 0, Math.PI * 2); ctx.fill();
        ctx.save(); ctx.translate(8, 44); ctx.rotate(0.55);
        ctx.beginPath(); ctx.ellipse(4, 14, 9, 4, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    } else if (state === 'diving') {
        ctx.beginPath(); ctx.ellipse(-10, 55, 9, 4, -0.25, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(10, 55, 9, 4, 0.25, 0, Math.PI * 2); ctx.fill();
    } else {
        ctx.beginPath(); ctx.ellipse(-8, 57, 9, 4, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(8, 57, 9, 4, 0, 0, Math.PI * 2); ctx.fill();
    }

    // --- Socks ---
    ctx.fillStyle = '#f5f5f5';
    const rr = (rx, ry, rw, rh, rd = 3) => { ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(rx, ry, rw, rh, rd); else ctx.rect(rx, ry, rw, rh); ctx.fill(); };
    if (state === 'kicking') {
        rr(-12, 41, 8, 17); ctx.save(); ctx.translate(8, 35); ctx.rotate(0.55); rr(0, 0, 8, 17); ctx.restore();
    } else if (state === 'diving') {
        rr(-13, 39, 8, 17); rr(5, 39, 8, 17);
    } else if (state === 'running') {
        const b = Math.sin(Date.now() / 55) * 7;
        rr(-12 + b * 0.4, 41, 8, 17); rr(4 - b * 0.4, 41 - Math.abs(b) * 0.3, 8, 17);
    } else {
        rr(-12, 41, 8, 17); rr(4, 41, 8, 17);
    }

    // --- Thighs (skin) ---
    ctx.fillStyle = sc;
    if (state === 'kicking') {
        rr(-12, 28, 8, 15); ctx.save(); ctx.translate(8, 24); ctx.rotate(0.55); rr(0, 0, 8, 15); ctx.restore();
    } else if (state === 'running') {
        const b = Math.sin(Date.now() / 55) * 7;
        rr(-12 + b * 0.5, 28, 8, 15); rr(4 - b * 0.5, 28 - Math.abs(b) * 0.4, 8, 15);
    } else {
        rr(-12, 28, 8, 15); rr(4, 28, 8, 15);
    }

    // --- Shorts ---
    ctx.fillStyle = shortsColor;
    ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(-13, 22, 26, 10, [0, 0, 6, 6]); else ctx.rect(-13, 22, 26, 10); ctx.fill();
    // Tiny number on shorts
    ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '700 6px Outfit'; ctx.fillText(number || "", 6, 29);
    // Shorts seam
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, 22); ctx.lineTo(0, 32); ctx.stroke();

    // --- Shirt ---
    ctx.fillStyle = shirt;
    ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(-13, -5, 26, 29, [7, 7, 0, 0]); else ctx.rect(-13, -5, 26, 29); ctx.fill();
    // V-collar
    ctx.fillStyle = hexDarken(shirt, 0.72);
    ctx.beginPath(); ctx.moveTo(-6, -5); ctx.lineTo(0, 3); ctx.lineTo(6, -5); ctx.closePath(); ctx.fill();

    // --- Arms ---
    ctx.strokeStyle = sc; ctx.lineWidth = 7; ctx.lineCap = 'round';
    if (isGoalie) {
        if (state === 'diving' || state === 'superman') {
            // Superman pose: arms extended forward (start from shoulders y=2)
            ctx.beginPath();
            ctx.moveTo(-11, 2); ctx.lineTo(-42, -18);
            ctx.moveTo(11, 2); ctx.lineTo(42, -18);
            ctx.stroke();
            // Optional: Gloves
            ctx.fillStyle = '#fff';
            rr(-48, -25, 12, 12, 4); rr(36, -25, 12, 12, 4);

            // Draw sleeves on the raised arms
            ctx.fillStyle = shirt;
            ctx.save();
            ctx.translate(-11, 2); ctx.rotate(Math.atan2(-20, -31));
            rr(0, -4, 15, 8, 3);
            ctx.restore();
            ctx.save();
            ctx.translate(11, 2); ctx.rotate(Math.atan2(-20, 31));
            rr(0, -4, 15, 8, 3);
            ctx.restore();
        } else if (state === 'catching') {
            ctx.beginPath(); ctx.moveTo(-13, 9); ctx.lineTo(-22, -9); ctx.moveTo(13, 9); ctx.lineTo(22, -9); ctx.stroke();
            // Normal sleeves
            ctx.fillStyle = shirt; rr(-20, 4, 8, 10, 4); rr(12, 4, 8, 10, 4);
        } else {
            ctx.beginPath(); ctx.moveTo(-13, 8); ctx.lineTo(-25, 22); ctx.moveTo(13, 8); ctx.lineTo(25, 22); ctx.stroke();
            // Normal sleeves
            ctx.fillStyle = shirt; rr(-20, 4, 8, 10, 4); rr(12, 4, 8, 10, 4);
        }
    } else {
        ctx.beginPath();
        if (state === 'running') {
            const sw = Math.sin(Date.now() / 55) * 10;
            ctx.moveTo(-13, 7); ctx.lineTo(-21 + sw, 24); ctx.moveTo(13, 7); ctx.lineTo(21 - sw, 24);
        } else if (state === 'kicking') {
            ctx.moveTo(-13, 7); ctx.lineTo(-23, 20); ctx.moveTo(13, 7); ctx.lineTo(25, 12);
        } else {
            ctx.moveTo(-13, 7); ctx.lineTo(-21, 24); ctx.moveTo(13, 7); ctx.lineTo(21, 24);
        }
        ctx.stroke();
        // Sleeves for player
        ctx.fillStyle = shirt;
        const sy = (state === 'kicking') ? 2 : 4;
        rr(-20, sy, 8, 10, 4); rr(12, sy, 8, 10, 4);
    }

    // --- Neck ---
    ctx.fillStyle = sc;
    ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(-5, -14, 10, 12, 3); else ctx.rect(-5, -14, 10, 12); ctx.fill();

    // --- HEAD & FACE DRAWING ---
    const hs = char.hairStyle || 'classic';
    const bt = char.browType || 'normal';
    const fh = char.facialHair || null;

    // 1. Hair Back/Base
    ctx.fillStyle = char.hair || '#111';
    ctx.beginPath();
    if (hs === 'mohawk') {
        ctx.ellipse(0, -28, 12, 22, 0, 0, Math.PI * 2);
    } else if (hs === 'buzz') {
        ctx.arc(0, -18, 24, Math.PI, 0);
    } else if (hs === 'curly') {
        for (let a = 0; a < Math.PI; a += 0.4) {
            ctx.arc(Math.cos(a + Math.PI) * 24, Math.sin(a + Math.PI) * 24 - 18, 6, 0, Math.PI * 2);
        }
    } else if (hs === 'fade') {
        ctx.arc(0, -21, 25, Math.PI, 0);
        ctx.fillRect(-25, -21, 50, 5);
    } else if (hs === 'pompadour') {
        // High volume hair for Mixi
        ctx.beginPath();
        ctx.ellipse(0, -26, 26, 18, 0, Math.PI, 0); // Top volume
        ctx.fill();
        ctx.fillRect(-24, -22, 48, 8); // Sides
    } else {
        ctx.arc(0, -22, 26, Math.PI, 0);
    }
    ctx.fill();

    // 2. Face Shape
    ctx.fillStyle = sc;
    ctx.beginPath();
    ctx.arc(0, -16, 23, 0, Math.PI * 2);
    ctx.fill();

    // 3. Facial Hair (Beard/Mustache)
    if (fh) {
        ctx.fillStyle = hexDarken(char.hair || '#111', 0.8);
        ctx.globalAlpha = 0.5;
        if (fh === 'beard') {
            ctx.beginPath(); ctx.arc(0, -11, 23.2, 0.4, Math.PI - 0.4);
            ctx.lineTo(0, -2); ctx.fill();
        } else if (fh === 'goatee') {
            ctx.beginPath(); ctx.ellipse(0, -5, 7, 8, 0, 0, Math.PI * 2); ctx.fill();
        } else if (fh === 'mixi-style') {
            // Refined Mixi beard: Thin mustache + sharp goatee
            ctx.fillRect(-12, -14, 24, 1.8); // Mustache
            ctx.beginPath();
            ctx.moveTo(-3, -10); ctx.lineTo(0, -3); ctx.lineTo(3, -10); ctx.fill(); // Soul patch
            ctx.beginPath(); ctx.arc(0, -4, 5, 0, Math.PI); ctx.stroke(); // Chin shadow
        }
        ctx.globalAlpha = 1.0;
    }

    // 4. Eyes
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(-8, -16, 4.5, 0, Math.PI * 2);
    ctx.arc(8, -16, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = '#111';
    ctx.beginPath();
    let eyeFocusY = (state === 'kicking') ? -15 : -16;
    ctx.arc(-8, eyeFocusY, 2.2, 0, Math.PI * 2);
    ctx.arc(8, eyeFocusY, 2.2, 0, Math.PI * 2);
    ctx.fill();

    // 5. Eyebrows
    ctx.strokeStyle = hexDarken(char.hair || '#111', 0.5);
    ctx.lineWidth = (bt === 'thick') ? 2.8 : 1.8;
    ctx.beginPath();
    if (bt === 'thick') {
        ctx.moveTo(-14, -23); ctx.lineTo(-3, -21.5);
        ctx.moveTo(14, -23); ctx.lineTo(3, -21.5);
    } else if (bt === 'sharp') {
        ctx.lineWidth = 2.2;
        ctx.moveTo(-14, -22); ctx.lineTo(-4, -24);
        ctx.moveTo(14, -22); ctx.lineTo(4, -24);
    } else {
        ctx.moveTo(-13, -22.5); ctx.quadraticCurveTo(-8, -25, -3, -22);
        ctx.moveTo(13, -22.5); ctx.quadraticCurveTo(8, -25, 3, -22);
    }
    ctx.stroke();

    // 6. Mouth
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    if (state === 'sad') {
        ctx.arc(0, -4, 6, Math.PI, 0);
    } else if (state === 'smile' || state === 'catching') {
        ctx.arc(0, -11, 8, 0.1, Math.PI - 0.1);
    } else if (state === 'running') {
        ctx.arc(0, -10, 3.5, 0, Math.PI * 2); // Small O shape
    } else {
        ctx.arc(0, -11, 5, 0.4, Math.PI - 0.4);
    }
    ctx.stroke();

    // 7. Special Extras (Mole, etc.)
    if (char.special === 'mole') {
        ctx.fillStyle = '#111';
        ctx.beginPath(); ctx.arc(9, -10, 2, 0, Math.PI * 2); ctx.fill();
    }
    if (name === 'NEYMAR') { // Earring
        ctx.fillStyle = '#ffd700';
        ctx.beginPath(); ctx.arc(23, -16, 2, 0, Math.PI * 2); ctx.fill();
    }

    // --- SHIRT TEXT ---
    ctx.fillStyle = isGoalie ? '#000' : getContrastColor(shirt);
    ctx.textAlign = 'center';
    const nl = (name || "").length > 6 ? 7 : 9;
    ctx.font = `800 ${nl}px Outfit`;
    ctx.fillText(name || "", 0, 12, 22);
    ctx.font = '800 17px Outfit';
    ctx.fillText(number || "10", 0, 28, 22);

    ctx.restore();
}

function drawBall() {
    ctx.save();
    ctx.translate(ball.x, ball.y);
    ctx.scale(ball.scale, ball.scale);
    ctx.rotate(ball.rotation);

    // Ball Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(0, 18, 14, 6, 0, 0, Math.PI * 2); ctx.fill();

    // Fireball effect for Power Shot
    if (isPowerShot && ball.y < ballStart.y - 20) {
        const fireGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 35);
        fireGrad.addColorStop(0, 'rgba(255, 165, 0, 0.8)');
        fireGrad.addColorStop(0.5, 'rgba(255, 69, 0, 0.4)');
        fireGrad.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = fireGrad;
        ctx.beginPath(); ctx.arc(0, 0, 35, 0, Math.PI * 2); ctx.fill();

        // Fire trails
        for (let i = 0; i < 8; i++) {
            ctx.fillStyle = `rgba(255, ${100 + Math.random() * 100}, 0, ${0.3 + Math.random() * 0.5})`;
            const angle = Math.random() * Math.PI * 2;
            const dist = 15 + Math.random() * 20;
            ctx.beginPath();
            ctx.arc(Math.cos(angle) * dist, Math.sin(angle) * dist + 10, 3 + Math.random() * 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // 3D Ball Base
    const ballGrad = ctx.createRadialGradient(-5, -5, 2, 0, 0, 15);
    ballGrad.addColorStop(0, '#fff');
    ballGrad.addColorStop(0.8, '#f0f0f0');
    ballGrad.addColorStop(1, '#bbb');
    ctx.fillStyle = ballGrad;
    ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI * 2); ctx.fill();

    // Realistic Hexagons
    ctx.fillStyle = '#222';
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ddd';
    for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        const hX = Math.cos(angle) * 8;
        const hY = Math.sin(angle) * 8;
        ctx.beginPath(); ctx.arc(hX, hY, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Highlight
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath(); ctx.arc(-5, -5, 4, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
}

function drawThoughtBubble(x, y, text) {
    if (!text) return;
    ctx.save();

    // Set font first to measure correctly
    ctx.font = '700 13px Outfit';
    const textWidth = ctx.measureText(text).width;
    const bubbleWidth = textWidth + 40; // Add padding

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 2;

    // Position bubble higher or further right depending on scale
    const bubbleX = x + 80;
    const bubbleY = y - 90;

    // Large Bubble
    ctx.beginPath();
    ctx.ellipse(bubbleX, bubbleY, bubbleWidth / 2, 35, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Small connector circles
    ctx.beginPath(); ctx.arc(x + 20, y - 55, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(x + 10, y - 35, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText(text, bubbleX, bubbleY + 5);

    ctx.restore();
}

function render() {
    drawField();

    // Draw goalie trails
    if (goalie.trail && goalie.trail.length > 0) {
        goalie.trail.forEach((t, i) => {
            ctx.save();
            ctx.globalAlpha = (i + 1) / (goalie.trail.length + 1) * 0.4;
            drawChibi({ ...goalie, x: t.x, y: t.y, state: t.state }, t.rotation, 1.8 * t.scale, true);
            ctx.restore();
        });
    }

    drawChibi(goalie, goalie.rotation, 1.8);
    drawChibi(player, 0, 1.8);
    if (player.thought) {
        drawThoughtBubble(player.x - 40, player.y - 30, player.thought);
    }
    drawBall();
}

function animateShot(dir, isGoal, cb) {
    const targets = [
        { x: goalPos.x - 120, y: goalPos.y - 40 },
        { x: goalPos.x, y: goalPos.y - 20 },
        { x: goalPos.x + 120, y: goalPos.y - 40 }
    ];
    const target = targets[dir];
    let goalieDiveDir = !isGoal ? dir : (dir + (Math.random() < 0.5 ? 1 : 2)) % 3;
    const goalieTargets = [goalPos.x - 120, goalPos.x, goalPos.x + 120];
    const gTargetX = goalieTargets[goalieDiveDir];

    let runT = 0;
    const playerStartX = player.x;
    const playerTargetX = ball.x - 40;

    function runStep() {
        runT += 0.05;
        player.x = playerStartX + (playerTargetX - playerStartX) * runT;
        player.state = 'running';
        render();
        if (runT < 1) requestAnimationFrame(runStep);
        else {
            player.state = 'kicking';
            startBallShot();
        }
    }

    function startBallShot() {
        let t = 0;
        const isSuperman = Math.random() > 0.3 || isPowerShot;
        function step() {
            t += 0.022;
            const startX = ballStart.x, startY = ballStart.y;
            ball.x = startX + (target.x - startX) * t;
            ball.y = startY + (target.y - startY) * t - Math.sin(t * Math.PI) * 120;
            ball.scale = 1 - t * 0.45;
            ball.rotation += 0.4;
            if (t > 0.12) {
                goalie.state = !isGoal && t > 0.6 ? 'catching' : (isSuperman ? 'superman' : 'diving');

                // Track trail
                goalie.trail.push({ x: goalie.x, y: goalie.y, rotation: goalie.rotation, state: goalie.state, scale: 1 - (t * 0.1) });
                if (goalie.trail.length > 5) goalie.trail.shift();

                // Superman fly logic: move further and tilt more
                if (goalie.state === 'superman') {
                    goalie.x += (gTargetX - goalie.x) * 0.18;
                    goalie.y = 90 - Math.sin((t - 0.12) / (1 - 0.12) * Math.PI) * 60; // Bay cao hơn nữa

                    // Smooth rotation for superman
                    const rotTarget = (goalieDiveDir === 0) ? -Math.PI / 2 : (goalieDiveDir === 2 ? Math.PI / 2 : 0);
                    goalie.rotation += (rotTarget - goalie.rotation) * 0.2;
                } else {
                    goalie.x += (gTargetX - goalie.x) * 0.12;
                    if (goalieDiveDir === 0) goalie.rotation = -1.1 * (t - 0.12);
                    if (goalieDiveDir === 2) goalie.rotation = 1.1 * (t - 0.12);
                }

                if (!isGoal && t > 0.82) {
                    ball.x = goalie.x;
                    ball.y = goalie.y + 40;
                }
            }
            render();
            if (t < 1) requestAnimationFrame(step);
            else {
                player.state = 'idle';
                if (!isGoal) { goalie.state = 'smile'; ball.x = goalie.x; ball.y = goalie.y - 10; }
                else goalie.state = 'sad';
                goalie.y = 90; // Reset height
                goalie.trail = []; // Clear trail
                render(); cb();
            }
        }
        step();
    }
    runStep();
}

async function initGame() {
    try {
        const response = await fetch(`module_${selectedModule}.json`);
        const data = await response.json();

        const pickRandom = (arr, count) => [...arr].sort(() => Math.random() - 0.5).slice(0, count);
        const dedupeQuestions = (arr) => {
            const seen = new Set();
            return arr.filter((q) => {
                const key = `${q.type || ''}|${q.q || ''}|${q.m || ''}`;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });
        };

        const mcqs = (data.questions || []).map(q => ({ ...q, type: 'mcq' }));
        const codes = (data.coding_tasks || []).map(q => ({ ...q, type: 'code', m: q.q }));

        let allQuestions = [...mcqs, ...codes];
        if (selectedModule === 1) {
            const extraMcqs = module1McqFallback.map(q => ({ ...q, type: 'mcq' }));
            const extraCodes = questionBank.map(q => ({ ...q, type: 'code' }));

            const basePool = dedupeQuestions([...mcqs, ...codes]);
            const extraPool = dedupeQuestions([...extraMcqs, ...extraCodes]);

            const basePicked = pickRandom(basePool, Math.min(6, basePool.length));
            const extraPicked = pickRandom(extraPool, Math.min(4, extraPool.length));

            const merged = dedupeQuestions([...basePicked, ...extraPicked]);
            if (merged.length < 10) {
                const fillerPool = dedupeQuestions([...basePool, ...extraPool]);
                const remaining = fillerPool.filter((q) => !merged.some((m) => (m.q || m.m) === (q.q || q.m)));
                allQuestions = [...merged, ...pickRandom(remaining, 10 - merged.length)];
            } else {
                allQuestions = merged;
            }
        }

        activeQuestions = pickRandom(dedupeQuestions(allQuestions), 10);

        currentQuestion = 0;
        score = 0;
        lives = 3;
        consecutiveCorrect = 0;
        isPowerShot = false;
        helps = { call: false, wise: false, fifty: false };
        document.querySelectorAll('.lifeline-btn').forEach(b => b.classList.remove('used'));
        showQuestion();
    } catch (e) {
        console.error("Lỗi tải câu hỏi:", e);
        let bank;
        if (selectedModule === 1) bank = [...module1McqFallback, ...questionBank];
        else if (selectedModule === 2) bank = questionBank2;
        else if (selectedModule === 3) bank = questionBank3;
        else bank = questionBank4;

        const normalizedFallback = bank.map((q) => {
            if (q.type) return q;
            if (Array.isArray(q.opts) && typeof q.ans === 'number') {
                return { ...q, type: 'mcq' };
            }
            return { ...q, type: 'code' };
        });

        activeQuestions = normalizedFallback.sort(() => Math.random() - 0.5).slice(0, 10);
        showQuestion();
    }
}

function selectModule(num) {
    selectedModule = num;
    document.querySelectorAll('.module-card').forEach(c => c.classList.remove('active'));
    document.getElementById('mod' + num).classList.add('active');
}

function selectChar(idx) {
    characterIndex = idx;
    document.querySelectorAll('.char-card').forEach(c => c.classList.remove('active'));
    document.getElementById('char' + idx).classList.add('active');
}

function selectClub(clubId, el) {
    selectedClubId = clubId;
    selectedShirtColor = clubData[clubId].shirt;
    document.querySelectorAll('.club-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
}

function startGame() {
    const nameInput = document.getElementById('playerNameInput').value.trim();
    const numInput = document.getElementById('playerNumberInput').value.trim();
    const gkNameInput = document.getElementById('gkNameInput').value.trim();
    const gkNumInput = document.getElementById('gkNumberInput').value.trim();

    if (!nameInput || !numInput || !gkNameInput || !gkNumInput) {
        document.getElementById('mixiNotice').style.display = 'flex';
        return;
    }

    const charConfig = characterConfigs[characterIndex];
    const club = clubData[selectedClubId];

    player.name = nameInput.toUpperCase();
    player.number = numInput;
    player.skin = charConfig.skin;
    player.hair = charConfig.hair;
    player.hairStyle = charConfig.hairStyle;
    player.browType = charConfig.browType;
    player.facialHair = charConfig.facialHair;
    player.special = charConfig.special;
    player.faceImg = charConfig.faceImg;
    player.body = charConfig.body;
    player.shirt = selectedShirtColor;

    goalie.name = gkNameInput.toUpperCase();
    goalie.number = gkNumInput;

    playerName = player.name;
    playerNumber = player.number;

    localStorage.setItem('penalty_playerName', player.name);
    localStorage.setItem('penalty_playerNumber', player.number);
    localStorage.setItem('penalty_gkName', goalie.name);
    localStorage.setItem('penalty_gkNumber', goalie.number);
    localStorage.setItem('penalty_characterIndex', characterIndex);
    localStorage.setItem('penalty_shirtColor', selectedShirtColor);
    localStorage.setItem('penalty_clubId', selectedClubId);

    gameStarted = true;
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    initGame();
}

function showQuestion() {
    if (currentQuestion >= 10) { showFinalResult(); return; }
    const q = activeQuestions[currentQuestion];

    const questionText = q.type === 'mcq' ? q.q : q.m;
    document.getElementById('question').innerText = `Câu ${currentQuestion + 1}: ${questionText}`;

    document.getElementById('hint').innerText = '';
    document.getElementById('directionBox').style.display = 'none';
    document.getElementById('result').innerText = '';
    document.getElementById('result').style.color = '#fff';

    const optsContainer = document.getElementById('optsContainer');
    const answerInput = document.getElementById('answer');
    const submitBtn = document.getElementById('submitBtn');

    if (q.type === 'mcq') {
        answerInput.style.display = 'none';
        submitBtn.style.display = 'none';
        optsContainer.style.display = 'block';
        optsContainer.innerHTML = '';

        q.opts.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'opt-btn';
            btn.innerText = opt;
            btn.onclick = () => checkMCQ(idx);
            optsContainer.appendChild(btn);
        });
    } else {
        optsContainer.style.display = 'none';
        answerInput.style.display = 'block';
        submitBtn.style.display = 'inline-block';
        answerInput.value = '';
    }

    ball = { ...ballStart, rotation: 0 };
    goalie.x = cw / 2; goalie.y = 90; goalie.rotation = 0; goalie.state = 'idle'; goalie.trail = [];
    player.x = cw / 2 - 160; player.y = ch - 100; player.state = 'idle'; player.thought = null;
    render();
}

function closeMixiNotice() {
    document.getElementById('mixiNotice').style.display = 'none';
    const nameInput = document.getElementById('playerNameInput').value.trim();
    const numInput = document.getElementById('playerNumberInput').value.trim();
    const gkNameInput = document.getElementById('gkNameInput').value.trim();
    const gkNumInput = document.getElementById('gkNumberInput').value.trim();

    if (!nameInput) document.getElementById('playerNameInput').focus();
    else if (!numInput) document.getElementById('playerNumberInput').focus();
    else if (!gkNameInput) document.getElementById('gkNameInput').focus();
    else if (!gkNumInput) document.getElementById('gkNumberInput').focus();
}

function handleLifeLoss() {
    lives--;
    consecutiveCorrect = 0; // Reset combo
    isPowerShot = false;
    render();
    if (lives <= 0) {
        showGameOver();
        return true;
    }
    return false;
}

function showGameOver() {
    shooting = false;
    document.getElementById('questionBox').style.display = 'none';
    document.getElementById('directionBox').style.display = 'none';
    document.getElementById('hint').innerText = '';

    const looseAudio = document.getElementById('looseAudio');
    if (looseAudio) {
        looseAudio.currentTime = 0;
        looseAudio.play().catch(e => console.log("Loose audio play failed:", e));
    }

    saveScore(playerName, playerNumber, score);

    const resultDiv = document.getElementById("result");
    resultDiv.style.color = '#e74c3c';
    resultDiv.innerHTML = `
        <div class="game-over-container" style="text-align: center; background: rgba(255,255,255,0.9); padding: 20px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); margin-top: 20px;">
            <img src="img/batluc.jpg" alt="Game Over" style="width: 450px; max-width: 90%; border-radius: 10px; margin-bottom: 15px; border: 3px solid #e74c3c;">
            <h3 style="margin: 0; font-size: 24px;">HẾT LƯỢT! 💔</h3>
             <p style="font-size: 18px; margin: 10px 0;">Bạn đã hết tim rồi. Phải bắt đầu lại thôi!</p>
            <button class="start-game-btn" style="width: auto; padding: 10px 40px; margin-top: 10px;" onclick="location.reload()"> CHƠI LẠI </button>
        </div>
    `;
}

function checkMCQ(idx) {
    if (shooting) return;
    const q = activeQuestions[currentQuestion];
    if (idx === q.ans) {
        consecutiveCorrect++;
        if (consecutiveCorrect >= 3) {
            isPowerShot = true;
            document.getElementById('result').innerHTML = '<span class="powershot-text">🔥 POWERSHOT KÍCH HOẠT! 🔥</span><br>Bàn thắng tiếp theo sẽ được x2!';
        } else {
            document.getElementById('result').innerText = 'Chính xác! Bạn đã sẵn sàng sút bóng.';
        }
        document.getElementById('directionBox').style.display = 'block';
        document.getElementById('optsContainer').style.display = "none";
    } else {
        document.getElementById('result').style.color = '#e74c3c';
        document.getElementById('result').innerText = 'Sai rồi! -1 tim ❤️';
        document.getElementById('hint').innerText = 'Gợi ý: Hãy suy nghĩ kỹ hơn!';
        handleLifeLoss();
    }
}

function submitAnswer() {
    if (shooting) return;
    const val = document.getElementById('answer').value.trim();
    const q = activeQuestions[currentQuestion];

    const regex = typeof q.r === 'string' ? new RegExp(q.r) : q.r;

    if (regex.test(val)) {
        consecutiveCorrect++;
        if (consecutiveCorrect >= 3) {
            isPowerShot = true;
            document.getElementById('result').innerHTML = '<span class="powershot-text">🔥 POWERSHOT KÍCH HOẠT! 🔥</span><br>Bàn thắng tiếp theo sẽ được x2!';
        } else {
            document.getElementById('result').innerText = 'Chính xác! Bạn đã sẵn sàng sút bóng.';
        }
        document.getElementById('directionBox').style.display = 'block';
        document.getElementById("answer").style.display = "none";
        document.getElementById("submitBtn").style.display = "none";
    } else {
        document.getElementById('result').style.color = '#e74c3c';
        document.getElementById('result').innerText = 'Mã code chưa đúng rồi! -1 tim ❤️';
        document.getElementById('hint').innerText = 'Nhà thông thái gợi ý: ' + q.h;
        handleLifeLoss();
    }
}

function shoot(dir) {
    if (shooting) return;
    shooting = true;
    document.getElementById('directionBox').style.display = 'none';
    const goalieGuess = Math.floor(Math.random() * 3);
    const isGoal = dir !== goalieGuess;
    animateShot(dir, isGoal, function () {
        if (isGoal) {
            const addedScore = isPowerShot ? 2 : 1;
            score += addedScore;
            const goalAudio = document.getElementById('goalAudio');
            if (goalAudio) {
                goalAudio.currentTime = 0;
                goalAudio.play().catch(e => console.log("Goal audio play failed:", e));
            }
            document.getElementById('result').style.color = isPowerShot ? '#ff4500' : '#2ecc71';
            const shotMsg = isPowerShot ? `SIÊU PHẨM LỬA! Ghi được x2 bàn thắng (${addedScore})!` : `VÀOOO! Thủ môn bó tay trước cú sút vào ${directions[dir]}!`;
            document.getElementById('result').innerText = shotMsg;
        } else {
            const saveAudio = document.getElementById('saveAudio');
            if (saveAudio) {
                saveAudio.currentTime = 0;
                saveAudio.play().catch(e => console.log("Save audio play failed:", e));
            }
            document.getElementById('result').style.color = '#e74c3c';
            document.getElementById('result').innerText = `KHÔNG VÀO! Thủ môn xuất sắc ở ${directions[dir]}!`;
        }
        setTimeout(() => {
            currentQuestion++;
            if (isPowerShot) {
                isPowerShot = false;
                consecutiveCorrect = 0;
            }
            shooting = false;
            showQuestion();
        }, 2000);
    });
}

function useLifeline(type) {
    if (helps[type]) return;
    const q = activeQuestions[currentQuestion];

    if (type === 'fifty') {
        if (q.type !== 'mcq') {
            alert("Quyền trợ giúp này chỉ dành cho câu hỏi trắc nghiệm!");
            return; // Don't mark as used
        }
        helps[type] = true;
        document.getElementById(type + 'Btn').classList.add('used');

        const btns = document.querySelectorAll('.opt-btn');
        let incorrectIndices = [];
        q.opts.forEach((opt, idx) => {
            if (idx !== q.ans) incorrectIndices.push(idx);
        });

        // Pick 2 random incorrect indices to hide
        const toHide = incorrectIndices.sort(() => Math.random() - 0.5).slice(0, 2);
        toHide.forEach(idx => {
            btns[idx].style.visibility = 'hidden';
            btns[idx].style.pointerEvents = 'none';
        });
        player.thought = "Bớt đi 2 cái sai, dễ thôi mà!";
        render();
        return;
    }

    helps[type] = true;
    document.getElementById(type + 'Btn').classList.add('used');

    let resultText = "";
    if (q.type === 'mcq') {
        resultText = q.opts[q.ans];
    } else {
        resultText = (type === 'call') ? q.h : q.w;
    }

    if (type === 'call') {
        const audio = document.getElementById('callAudio');
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log("Audio play failed:", e));
        }
        document.getElementById('callModal').style.display = 'flex';
        document.getElementById('callMsg').innerText = "Số này của ai ấy nhỉ?...";
        document.getElementById('callResult').innerText = "";
        setTimeout(() => {
            document.getElementById('callMsg').innerText = "À, Anh Độ Mixi đây rồi!";
            document.getElementById('callResult').innerHTML = `Anh bảo đáp án là: <div class="highlight-code">${resultText}</div><span class="extra-msg">"Em đừng có mà chối!"</span>`;
            player.thought = "Nà ná na na. Cảm ơn Anh Độ Mixi!";
            render();
        }, 1500);
    } else if (type === 'wise') {
        const audio = document.getElementById('wiseAudio');
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log("Audio play failed:", e));
        }
        document.getElementById('wiseModal').style.display = 'flex';
        document.getElementById('wiseResult').innerText = "";
        setTimeout(() => {
            document.getElementById('wiseMsg').innerText = "Lời khuyên từ nhà thông thái (người Ý):";
            document.getElementById('wiseResult').innerHTML = `Người Ý nói: <div class="highlight-code">${resultText}</div><span class="extra-msg">"Tin chuẩn em nhé!"</span>`;
            player.thought = "Cảm ơn bác Trông Anh Ngược!";
            render();
        }, 1500);
    }
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    if (id === 'callModal') {
        const audio = document.getElementById('callAudio');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    } else if (id === 'wiseModal') {
        const audio = document.getElementById('wiseAudio');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    } else if (id === 'finalPrizeModal') {
        const audio = document.getElementById('winAudio');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
}

function scrollToPrizes() {
    closeModal('shotResultModal');
    document.getElementById('prizes').style.display = 'block';
    showRedEnvelopes();
    document.getElementById('prizes').scrollIntoView({ behavior: 'smooth' });
}

let picksAllowed = 0;

function showFinalResult() {
    let msg = `Bạn đã ghi được <b>${score}/10</b> bàn thắng. `;
    const openBtn = document.getElementById('openEnvelopesBtn');

    saveScore(playerName, playerNumber, score);

    if (score >= 7) {
        if (score > 10) picksAllowed = 3;
        else if (score >= 9) picksAllowed = 2;
        else picksAllowed = 1; // 7-8 bàn

        msg += `<br>Phong độ tuyệt vời! Bạn nhận được <b>${picksAllowed}</b> lượt mở bao lì xì. 🔥`;
        openBtn.style.display = 'inline-block';
    } else {
        msg += "<br>Hơi tiếc một chút! Bạn cần ít nhất 7 bàn để nhận được quà lì xì. Hãy cố gắng hơn nhé! 💪";
        openBtn.style.display = 'none';
    }

    document.getElementById('shotResultMsg').innerHTML = msg;
    document.getElementById('shotResultModal').style.display = 'flex';
    document.getElementById("questionBox").style.display = "none";
}

function showRedEnvelopes() {
    document.getElementById("prizes").style.display = "block";
    const container = document.getElementById("envelopeContainer");
    container.innerHTML = '';
    const prizes = [
        { name: "5.000 VND", icon: "💵" },
        { name: "Ra chơi sớm 5 phút", icon: "🔔" },
        { name: "Chúc bạn may mắn lần sau", icon: "🍀" },
        { name: "Chúc bạn may mắn lần sau", icon: "🍀" }
    ];
    prizes.sort(() => Math.random() - 0.5);
    prizes.forEach((prize, index) => {
        const env = document.createElement('div');
        env.className = 'envelope';
        env.id = `env-${index}`;
        env.onclick = () => openEnvelope(index);
        env.innerHTML = `<div class="prize-content"><div class="prize-icon">${prize.icon}</div><div class="prize-value">${prize.name}</div></div>`;
        container.appendChild(env);
    });
}

let pickedPrizes = [];
function openEnvelope(index) {
    const env = document.getElementById(`env-${index}`);
    if (env.classList.contains('opened') || picksAllowed <= 0) return;

    env.classList.add('opened');
    picksAllowed--;

    const prizeValue = env.querySelector('.prize-value').innerText;
    pickedPrizes.push(prizeValue);

    if (prizeValue === "Khô gà đè tem") {
        setTimeout(() => {
            document.getElementById('prizeModal').style.display = 'flex';
        }, 800);
    }

    if (picksAllowed === 0) {
        document.getElementById("result").innerText = `Đã hết lượt mở! Hãy xem những phần quà bạn đã bỏ lỡ...`;
        document.querySelectorAll('.envelope:not(.opened)').forEach((env, i) => {
            setTimeout(() => {
                env.classList.add('revealed');
                env.onclick = null;
            }, i * 200);
        });
        document.querySelectorAll('.envelope.opened').forEach(env => env.onclick = null);

        setTimeout(async () => {
            const winAudio = document.getElementById('winAudio');
            if (winAudio) {
                winAudio.currentTime = 0;
                winAudio.play().catch(e => console.log("Win audio play failed:", e));
            }
            document.getElementById('finalPrizeMsg').innerHTML = `Bạn đã cực kỳ may mắn mở được: <br><b style="color:#c0392b; font-size: 1.3rem;">${pickedPrizes.join(" & ")}</b>! 🎁`;

            try {
                const { data } = await supabaseClient
                    .from('leaderboard')
                    .select('name, jersey_number, score')
                    .order('score', { ascending: false });

                if (data) {
                    const myRank = data.findIndex(p => p.name === playerName && p.jersey_number == playerNumber && p.score == score) + 1;
                    document.getElementById('leaderboardRank').innerText = `Xếp hạng của bạn: #${myRank > 0 ? myRank : '?'}`;
                }
            } catch (err) {
                console.error("Lỗi lấy thứ hạng:", err);
            }

            document.getElementById('finalPrizeModal').style.display = 'flex';
        }, 4000);
    } else {
        document.getElementById("result").innerText = `Đã mở: ${prizeValue}! Còn ${picksAllowed} lượt chọn nữa. 🔥`;
    }
}



window.onload = function () {
    const savedName = localStorage.getItem('penalty_playerName');
    const savedNumber = localStorage.getItem('penalty_playerNumber');
    const savedGkName = localStorage.getItem('penalty_gkName');
    const savedGkNumber = localStorage.getItem('penalty_gkNumber');
    const savedChar = localStorage.getItem('penalty_characterIndex');
    const savedClub = localStorage.getItem('penalty_clubId');

    if (savedName) document.getElementById('playerNameInput').value = savedName;
    if (savedNumber) document.getElementById('playerNumberInput').value = savedNumber;
    if (savedGkName) document.getElementById('gkNameInput').value = savedGkName;
    if (savedGkNumber) document.getElementById('gkNumberInput').value = savedGkNumber;

    if (savedChar !== null) {
        selectChar(parseInt(savedChar));
    }

    if (savedClub) {
        const clubEl = document.getElementById('club-' + savedClub);
        if (clubEl) {
            selectClub(savedClub, clubEl);
        }
    }
    renderLeaderboard();
};

async function renderLeaderboard() {
    const listElement = document.getElementById('leaderboardList');
    if (!listElement) return;

    const filterVal = document.getElementById('leaderboardFilter')?.value || "1";

    try {
        const { data: leaderboard, error } = await supabaseClient
            .from('leaderboard')
            .select('*')
            .eq('module', filterVal)
            .order('score', { ascending: false })
            .limit(10);

        if (error) throw error;

        if (!leaderboard || leaderboard.length === 0) {
            listElement.innerHTML = '<div class="empty-state">Chưa có dữ liệu xếp hạng</div>';
            return;
        }

        listElement.innerHTML = leaderboard.map((player, index) => {
            let rankIcon = index + 1;
            if (index === 0) rankIcon = "🥇";
            else if (index === 1) rankIcon = "🥈";
            else if (index === 2) rankIcon = "🥉";

            const displayDate = player.created_at ? new Date(player.created_at).toLocaleString('vi-VN') : 'Mới';

            return `
                <div class="leader-item">
                    <div class="rank">${rankIcon}</div>
                    <div class="leader-info">
                        <span class="leader-name">${player.name} #${player.jersey_number}</span>
                        <span class="leader-meta">${displayDate}</span>
                    </div>
                    <div class="leader-score">${player.score}</div>
                </div>
            `;
        }).join('');
    } catch (err) {
        console.error("Lỗi khi tải bảng xếp hạng:", err);
        listElement.innerHTML = '<div class="empty-state" style="color:#e74c3c">Lỗi kết nối bảng xếp hạng</div>';
    }
}

async function saveScore(name, jerseyNumber, finalScore) {
    const jNum = parseInt(jerseyNumber, 10) || 0;
    try {
        const { data: records, error: fetchError } = await supabaseClient
            .from('leaderboard')
            .select('*')
            .eq('name', name)
            .eq('jersey_number', jNum)
            .eq('module', selectedModule.toString())
            .order('score', { ascending: false })
            .limit(1);

        if (fetchError) throw fetchError;

        const existing = records && records.length > 0 ? records[0] : null;

        if (existing) {
            if (finalScore > existing.score) {
                const { error: updateError } = await supabaseClient
                    .from('leaderboard')
                    .update({ score: finalScore })
                    .eq('id', existing.id);
                if (updateError) throw updateError;
                console.log("Cập nhật điểm thành công!");
            }
        } else {
            const { error: insertError } = await supabaseClient
                .from('leaderboard')
                .insert([{ name, jersey_number: jNum, score: finalScore, module: selectedModule.toString() }]);
            if (insertError) throw insertError;
            console.log("Lưu điểm mới thành công!");
        }

        if (document.getElementById('leaderboardFilter')) {
            document.getElementById('leaderboardFilter').value = selectedModule.toString();
        }
        renderLeaderboard();
    } catch (err) {
        console.error("Lỗi Supabase chi tiết:", err);
        const errorMsg = err.message || (typeof err === 'string' ? err : 'Lỗi không xác định');
        alert("LƯU ĐIỂM THẤT BẠI!\n\nMã lỗi: " + errorMsg + "\n\nLời khuyên: Bạn hãy nhấn F12 (hoặc Chuột phải -> Kiểm tra) và xem tab 'Console' để thấy chi tiết lỗi màu đỏ nhé!");
    }
}

