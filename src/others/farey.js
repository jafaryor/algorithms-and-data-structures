
class Rational {
  constructor(numerator, denominator) {
    let g = Rational.gcd(numerator, denominator);
    
    this.numerator = numerator/g;
    this.denominator = denominator/g;
  }

  static gcd(a, b) {
    if (!b) {
        return a;
    }
    return Rational.gcd(b, a % b);
  }

  toString() {
    return this.numerator + '/' + this.denominator;
  }
}

function Farey(n) {
  function FareyElements(n) {
    if (n===1) {
      return new Set([
        (new Rational(0, 1)).toString(),
        (new Rational(1, 1)).toString()
      ]);
    } else {
      let set = FareyElements(n-1);
      for (let i=1; i<=n; ++i) {
        set.add((new Rational(i, n)).toString());
      }
      return set;
    }  
  }
  
  return Array.from(FareyElements(n)).sort((a, b) => {
    let x = +a.split('/')[0] / +a.split('/')[1];
    let y = +b.split('/')[0] / +b.split('/')[1];

    return x - y;
  });
}


Farey(4).forEach((element) => {
	console.log(element);
});


let arr = ['123-456-9465', '1235661111'];

function normalizePhoneNumbers(phoneNumbers) {
  for (let i=0; i<phoneNumbers.length; ++i) {
    phoneNumbers[i] = phoneNumbers[i].replace(/(\d{3})-?(\d{3})-?(\d{4})/gi, '$2-$1-$3');
  }
}

normalizePhoneNumbers(arr);
console.log(arr);














