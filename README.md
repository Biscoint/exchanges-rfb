# exchanges-rfb
Lib to format data to IN 1888 from Receita Federal do Brasil.

## Installing
### YARN
```yarn add exchanges-rfb```
### NPM
```npm install exchanges-rfb```

## Usage Example:

```
import Exchange from 'exchanges-rfb';

const MyEx = new Exchange({
    exchange_name: 'BiscointEx',
    exchange_cnpj: '17.869.530/0001-73',
    exchange_url: 'https://testex.biscoint.io'
});

MyEx.addBuySellOperation({ date, id, brl_value, brl_fees, coin_symbol coin_quantity, buyer_identity_type, buyer_country, buyer_document, buyer_fullname, buyer_address, seller_identity_type, seller_country, seller_document, seller_fullname, seller_address });

console.log(MyEx.exportFile());
```

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
