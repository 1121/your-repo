# your-repo

Directory structure:
└── 1121-your-repo/
    ├── README.md
    ├── app.js
    ├── app.js.txt
    ├── config.js
    ├── ethers.env
    ├── get-docker.sh
    ├── LICENSE
    ├── package.json
    ├── test.js
    └── usdt_abi


Files Content:

================================================
FILE: README.md
================================================
# your-repo


================================================
FILE: app.js
================================================
const express = require('express');
const mongoose = require('mongoose');
//const { ethers } = require('ethers'); // Correctly import ethers
const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/48ed2cfd2eaa40dc96cc87ed1962720a');

const dotenv = require('dotenv');
//const decimals = 6; // USDT usually has 6 decimals
const decimals = 6;
//const decimals = await usdtContract.decimals();
console.log('Decimals:', decimals);

console.log('Decimals:', decimals); // ✅ now works
//const provider = new ethers.JsonRpcProvider('<https://mainnet.infura.io/v3/48ed2cfd2eaa40dc96cc87ed1962720a>');


const usdtAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';  // USDT contract address
//const usdtAbi = [
  // ABI fragment to interact with balanceOf method
 // "function balanceOf(address owner) view returns (uint256)"
//];

//console.log("Sender address:", wallet.address);


const usdtAbi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address recipient, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)"
];


// Initialize the contract
const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);

//const amount = ethers.utils.parseUnits("1", 6); // ✅
const amount = ethers.utils.parseUnits("1", decimals); // GOOD ✅

console.log("Amount:", amount.toString());
console.log("Parsed amount:", amount.toString());
console.log(usdtContract);

dotenv.config();


console.log("MongoDB URI:", process.env.MONGODB_URI);
console.log("Private Key:", process.env.PRIVATE_KEY ? "Loaded" : "Not Loaded");
console.log("Infura URL:", process.env.INFURA_URL ? "Loaded" : "Not Loaded");


const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.log('❌ Error connecting to MongoDB:', err));




// Initialize the provider here
//const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL); // Make sure INFURA_URL is set in your .env
//const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

// Wallet Initialization
//const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

//const amount = ethers.utils.parseUnits("1", 6);  // "1" USDT is equivalent to 1,000,000 units (6 decimals)

// Ensure the amount and decimals are properly passed
//const amount = ethers.utils.parseUnits(amountString, 6); // assuming USDT has 6 decimals

// This will throw an error if 'amount' is undefined or invalid
//const amount = ethers.utils.parseUnits(amount, decimals); 


// Function to send USDT
async function sendUSDT(amount, recipientAddress) {
  try {
    // Convert amount to units (6 decimals for USDT)
    const amountInUnits = ethers.utils.parseUnits(amount, 6);

    // Get the USDT contract address (ERC-20)
    const USDT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // USDT contract on Ethereum mainnet
    const USDT_ABI = [
      'function transfer(address to, uint amount) public returns (bool)',
      'function balanceOf(address owner) public view returns (uint256)',
    ];

    // Initialize USDT contract
//    const usdtContract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, wallet);
// Correct order
const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);

    // Ensure the wallet has enough balance
    const balance = await usdtContract.balanceOf(wallet.address);
    console.log('Current Balance:', ethers.utils.formatUnits(balance, 6));
console.log("Sender address:", wallet.address);

    // Send USDT
    console.log(`Sending ${amount} USDT to ${recipientAddress}...`);
//    const tx = await usdtContract.transfer(recipientAddress, amountInUnits);
  
const tx = await usdtContract.transfer(recipientAddress, amount); // GOOD ✅

  console.log('Transaction Hash:', tx.hash);
    
    // Wait for the transaction to be mined
    await tx.wait();
    console.log('✅ Transaction Successful!');
  } catch (error) {
    console.log('❌ Error sending USDT:', error);
  }
}

// Example Usage: Sending USDT
app.post('/send-usdt', async (req, res) => {
  const { amount, recipient } = req.body;
  try {
    await sendUSDT(amount, recipient);
    res.send('Transaction Successful');
  } catch (error) {
    res.status(500).send('Error sending USDT');
  }
});

// Start Server
//app.listen(3000, () => {
  //console.log('🚀 Server running at http://localhost:3000');
//});


//const PORT = 3001; // or even 3100
//app.listen(PORT, () => {
  //console.log(`🚀 Server running at http://localhost:${PORT}`);
//});


console.log('Amount:', amount);
console.log('Decimals:', decimals);
//const parsedAmount = ethers.utils.parseUnits(amount, decimals);
//const amount = ethers.utils.parseUnits("1", 6);
//const tx = await usdtContract.transfer(recipientAddress, amount);
//async function main() {
    //const tx = await usdtContract.transfer(recipientAddress, amount);
  //  console.log("Transaction hash:", tx.hash);
//}
main().catch(console.error);



//const { ethers } = require('ethers');
//require('dotenv').config();




//const { ethers } = require('ethers');
//require('dotenv').config();


//const { ethers } = require('ethers');
//require('dotenv').config();

// Start Server
//app.listen(3000, () => {
 // console.log('🚀 Server running at http://localhost:3000');
//});

// Asynchronous logic wrapped inside the main function


//const { ethers } = require('ethers');
//require('dotenv').config();

// Start Server
//app.listen(3000, () => {
  //console.log('🚀 Server running at http://localhost:3000');
//});

// Asynchronous logic wrapped inside the main function

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// ✅ Configs
const INFURA_URL = process.env.INFURA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const MONGODB_URI = process.env.MONGODB_URI;
const RECIPIENT = process.env.RECIPIENT_ADDRESS || "0xYourRecipientAddress"; // Replace this!

console.log("MongoDB URI:", MONGODB_URI);
console.log("Private Key: Loaded");
console.log("Infura URL: Loaded");

// ✅ Setup provider & signer
//const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// ✅ USDT Contract ABI & address (change if needed)
//const usdtAbi = [
  "function decimals() view returns (uint8)",
  "function transfer(address to, uint amount) returns (bool)"
//];
//const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // Mainnet USDT

//const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, wallet);
  //const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, wallet);

async function main() {
  // Define the recipient address and contract details
 const decimals = await usdtContract.decimals(); // ✅ define it early
  console.log("Decimals:", decimals);

const amount = "1000000";  // Amount you want to send
    const parsedAmount = ethers.utils.parseUnits(amount, decimals); // Correctly parse the amount
    console.log("Parsed amount:", parsedAmount.toString());

    // Check sender balance before sending the transaction
    const balance = await usdtContract.balanceOf(wallet.address);
    console.log("Sender balance:", balance.toString());
    if (balance.lt(parsedAmount)) {
      console.log("❌ Insufficient funds");
      return;
  const recipientAddress = '0x518f42d2C507ffe2a0CD6D99605074a99b6052b8'; // Replace with actual recipient address
  const usdtAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // USDT Contract Address
   const parsedAmount = ethers.utils.parseUnits("1", decimals);

  // Create a provider and wallet using Infura and your private key
  const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Define the USDT contract ABI
  const usdtAbi = [
    'function transfer(address to, uint256 value) public returns (bool)',
    'function decimals() view returns (uint8)',
  ];

  // Connect to the USDT contract
//  const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, wallet);

  // Fetch the decimals (USDT typically has 6 decimals)
//  const decimals = await usdtContract.decimals();
  console.log("Decimals:", decimals);

  // Define the amount to transfer (e.g., 1 USDT)
  const amount = "1000";  // 1 USDT (as string)

  // Convert the amount to the smallest unit using the correct number of decimals
//  const parsedAmount = ethers.utils.parseUnits(amount, decimals);
  console.log('Parsed Amount:', parsedAmount.toString());

  // Send the transfer transaction
  const tx = await usdtContract.transfer(recipientAddress, parsedAmount);
  console.log("✅ Transaction sent! Hash:", tx.hash);
}

// Make sure to call the main function to execute the async logic
//main().catch(console.error);

}




// Make sure to call the main function to execute the async logic
//main().catch(console.error);





// Call the async function
main().catch((err) => {
    console.error("❌ Error:", err);
console.log("Sender address:", wallet.address);

});





================================================
FILE: app.js.txt
================================================
const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to Ethereum mainnet
const provider = new ethers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
);

// Wallet + signer
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// USDT ERC-20 ABI (minimal)
const usdtAbi = [
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() view returns (uint8)"
];

const usdtContract = new ethers.Contract(process.env.USDT_CONTRACT, usdtAbi, wallet);

// Route: POST /send-usdt
app.post('/send-usdt', async (req, res) => {
  const { to, amount } = req.body;

  if (!to || !amount) {
    return res.status(400).json({ error: 'Missing "to" or "amount"' });
  }

  try {
    const decimals = await usdtContract.decimals();
    const amountInUnits = ethers.parseUnits(amount.toString(), decimals);

    const tx = await usdtContract.transfer(to, amountInUnits);
    console.log("Transaction Hash:", tx.hash);

    await tx.wait(); // Wait for confirmation

    res.json({
      success: true,
      message: `Sent ${amount} USDT to ${to}`,
      txHash: tx.hash
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route: GET /balance/:address
app.get('/balance/:address', async (req, res) => {
  const { address } = req.params;

  try {
    const decimals = await usdtContract.decimals();
    const balance = await usdtContract.balanceOf(address);
    const formattedBalance = ethers.formatUnits(balance, decimals);

    res.json({
      address,
      usdtBalance: formattedBalance
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 USDT Sender App running on http://localhost:${PORT}`);
});




================================================
FILE: config.js
================================================
// config.js
module.exports = {
  infuraURL: "https://mainnet.infura.io/v3/48ed2cfd2eaa40dc96cc87ed1962720a", // Replace with your Infura URL
  privateKey: "875f86d1a04bb788f6b06dd7bc9c5fb7ed9fe95114d2236dd4ce15b9a13c4c6", // Replace with your private key
  mongoURI: "mongodb://localhost:27017/usdt-sender", // MongoDB URI
};



================================================
FILE: ethers.env
================================================



================================================
FILE: get-docker.sh
================================================
#!/bin/sh
set -e
# Docker Engine for Linux installation script.
#
# This script is intended as a convenient way to configure docker's package
# repositories and to install Docker Engine, This script is not recommended
# for production environments. Before running this script, make yourself familiar
# with potential risks and limitations, and refer to the installation manual
# at https://docs.docker.com/engine/install/ for alternative installation methods.
#
# The script:
#
# - Requires `root` or `sudo` privileges to run.
# - Attempts to detect your Linux distribution and version and configure your
#   package management system for you.
# - Doesn't allow you to customize most installation parameters.
# - Installs dependencies and recommendations without asking for confirmation.
# - Installs the latest stable release (by default) of Docker CLI, Docker Engine,
#   Docker Buildx, Docker Compose, containerd, and runc. When using this script
#   to provision a machine, this may result in unexpected major version upgrades
#   of these packages. Always test upgrades in a test environment before
#   deploying to your production systems.
# - Isn't designed to upgrade an existing Docker installation. When using the
#   script to update an existing installation, dependencies may not be updated
#   to the expected version, resulting in outdated versions.
#
# Source code is available at https://github.com/docker/docker-install/
#
# Usage
# ==============================================================================
#
# To install the latest stable versions of Docker CLI, Docker Engine, and their
# dependencies:
#
# 1. download the script
#
#   $ curl -fsSL https://get.docker.com -o install-docker.sh
#
# 2. verify the script's content
#
#   $ cat install-docker.sh
#
# 3. run the script with --dry-run to verify the steps it executes
#
#   $ sh install-docker.sh --dry-run
#
# 4. run the script either as root, or using sudo to perform the installation.
#
#   $ sudo sh install-docker.sh
#
# Command-line options
# ==============================================================================
#
# --version <VERSION>
# Use the --version option to install a specific version, for example:
#
#   $ sudo sh install-docker.sh --version 23.0
#
# --channel <stable|test>
#
# Use the --channel option to install from an alternative installation channel.
# The following example installs the latest versions from the "test" channel,
# which includes pre-releases (alpha, beta, rc):
#
#   $ sudo sh install-docker.sh --channel test
#
# Alternatively, use the script at https://test.docker.com, which uses the test
# channel as default.
#
# --mirror <Aliyun|AzureChinaCloud>
#
# Use the --mirror option to install from a mirror supported by this script.
# Available mirrors are "Aliyun" (https://mirrors.aliyun.com/docker-ce), and
# "AzureChinaCloud" (https://mirror.azure.cn/docker-ce), for example:
#
#   $ sudo sh install-docker.sh --mirror AzureChinaCloud
#
# ==============================================================================


# Git commit from https://github.com/docker/docker-install when
# the script was uploaded (Should only be modified by upload job):
SCRIPT_COMMIT_SHA="53a22f61c0628e58e1d6680b49e82993d304b449"

# strip "v" prefix if present
VERSION="${VERSION#v}"

# The channel to install from:
#   * stable
#   * test
DEFAULT_CHANNEL_VALUE="stable"
if [ -z "$CHANNEL" ]; then
	CHANNEL=$DEFAULT_CHANNEL_VALUE
fi

DEFAULT_DOWNLOAD_URL="https://download.docker.com"
if [ -z "$DOWNLOAD_URL" ]; then
	DOWNLOAD_URL=$DEFAULT_DOWNLOAD_URL
fi

DEFAULT_REPO_FILE="docker-ce.repo"
if [ -z "$REPO_FILE" ]; then
	REPO_FILE="$DEFAULT_REPO_FILE"
	# Automatically default to a staging repo fora
	# a staging download url (download-stage.docker.com)
	case "$DOWNLOAD_URL" in
		*-stage*) REPO_FILE="docker-ce-staging.repo";;
	esac
fi

mirror=''
DRY_RUN=${DRY_RUN:-}
while [ $# -gt 0 ]; do
	case "$1" in
		--channel)
			CHANNEL="$2"
			shift
			;;
		--dry-run)
			DRY_RUN=1
			;;
		--mirror)
			mirror="$2"
			shift
			;;
		--version)
			VERSION="${2#v}"
			shift
			;;
		--*)
			echo "Illegal option $1"
			;;
	esac
	shift $(( $# > 0 ? 1 : 0 ))
done

case "$mirror" in
	Aliyun)
		DOWNLOAD_URL="https://mirrors.aliyun.com/docker-ce"
		;;
	AzureChinaCloud)
		DOWNLOAD_URL="https://mirror.azure.cn/docker-ce"
		;;
	"")
		;;
	*)
		>&2 echo "unknown mirror '$mirror': use either 'Aliyun', or 'AzureChinaCloud'."
		exit 1
		;;
esac

case "$CHANNEL" in
	stable|test)
		;;
	*)
		>&2 echo "unknown CHANNEL '$CHANNEL': use either stable or test."
		exit 1
		;;
esac

command_exists() {
	command -v "$@" > /dev/null 2>&1
}

# version_gte checks if the version specified in $VERSION is at least the given
# SemVer (Maj.Minor[.Patch]), or CalVer (YY.MM) version.It returns 0 (success)
# if $VERSION is either unset (=latest) or newer or equal than the specified
# version, or returns 1 (fail) otherwise.
#
# examples:
#
# VERSION=23.0
# version_gte 23.0  // 0 (success)
# version_gte 20.10 // 0 (success)
# version_gte 19.03 // 0 (success)
# version_gte 26.1  // 1 (fail)
version_gte() {
	if [ -z "$VERSION" ]; then
			return 0
	fi
	version_compare "$VERSION" "$1"
}

# version_compare compares two version strings (either SemVer (Major.Minor.Path),
# or CalVer (YY.MM) version strings. It returns 0 (success) if version A is newer
# or equal than version B, or 1 (fail) otherwise. Patch releases and pre-release
# (-alpha/-beta) are not taken into account
#
# examples:
#
# version_compare 23.0.0 20.10 // 0 (success)
# version_compare 23.0 20.10   // 0 (success)
# version_compare 20.10 19.03  // 0 (success)
# version_compare 20.10 20.10  // 0 (success)
# version_compare 19.03 20.10  // 1 (fail)
version_compare() (
	set +x

	yy_a="$(echo "$1" | cut -d'.' -f1)"
	yy_b="$(echo "$2" | cut -d'.' -f1)"
	if [ "$yy_a" -lt "$yy_b" ]; then
		return 1
	fi
	if [ "$yy_a" -gt "$yy_b" ]; then
		return 0
	fi
	mm_a="$(echo "$1" | cut -d'.' -f2)"
	mm_b="$(echo "$2" | cut -d'.' -f2)"

	# trim leading zeros to accommodate CalVer
	mm_a="${mm_a#0}"
	mm_b="${mm_b#0}"

	if [ "${mm_a:-0}" -lt "${mm_b:-0}" ]; then
		return 1
	fi

	return 0
)

is_dry_run() {
	if [ -z "$DRY_RUN" ]; then
		return 1
	else
		return 0
	fi
}

is_wsl() {
	case "$(uname -r)" in
	*microsoft* ) true ;; # WSL 2
	*Microsoft* ) true ;; # WSL 1
	* ) false;;
	esac
}

is_darwin() {
	case "$(uname -s)" in
	*darwin* ) true ;;
	*Darwin* ) true ;;
	* ) false;;
	esac
}

deprecation_notice() {
	distro=$1
	distro_version=$2
	echo
	printf "\033[91;1mDEPRECATION WARNING\033[0m\n"
	printf "    This Linux distribution (\033[1m%s %s\033[0m) reached end-of-life and is no longer supported by this script.\n" "$distro" "$distro_version"
	echo   "    No updates or security fixes will be released for this distribution, and users are recommended"
	echo   "    to upgrade to a currently maintained version of $distro."
	echo
	printf   "Press \033[1mCtrl+C\033[0m now to abort this script, or wait for the installation to continue."
	echo
	sleep 10
}

get_distribution() {
	lsb_dist=""
	# Every system that we officially support has /etc/os-release
	if [ -r /etc/os-release ]; then
		lsb_dist="$(. /etc/os-release && echo "$ID")"
	fi
	# Returning an empty string here should be alright since the
	# case statements don't act unless you provide an actual value
	echo "$lsb_dist"
}

echo_docker_as_nonroot() {
	if is_dry_run; then
		return
	fi
	if command_exists docker && [ -e /var/run/docker.sock ]; then
		(
			set -x
			$sh_c 'docker version'
		) || true
	fi

	# intentionally mixed spaces and tabs here -- tabs are stripped by "<<-EOF", spaces are kept in the output
	echo
	echo "================================================================================"
	echo
	if version_gte "20.10"; then
		echo "To run Docker as a non-privileged user, consider setting up the"
		echo "Docker daemon in rootless mode for your user:"
		echo
		echo "    dockerd-rootless-setuptool.sh install"
		echo
		echo "Visit https://docs.docker.com/go/rootless/ to learn about rootless mode."
		echo
	fi
	echo
	echo "To run the Docker daemon as a fully privileged service, but granting non-root"
	echo "users access, refer to https://docs.docker.com/go/daemon-access/"
	echo
	echo "WARNING: Access to the remote API on a privileged Docker daemon is equivalent"
	echo "         to root access on the host. Refer to the 'Docker daemon attack surface'"
	echo "         documentation for details: https://docs.docker.com/go/attack-surface/"
	echo
	echo "================================================================================"
	echo
}

# Check if this is a forked Linux distro
check_forked() {

	# Check for lsb_release command existence, it usually exists in forked distros
	if command_exists lsb_release; then
		# Check if the `-u` option is supported
		set +e
		lsb_release -a -u > /dev/null 2>&1
		lsb_release_exit_code=$?
		set -e

		# Check if the command has exited successfully, it means we're in a forked distro
		if [ "$lsb_release_exit_code" = "0" ]; then
			# Print info about current distro
			cat <<-EOF
			You're using '$lsb_dist' version '$dist_version'.
			EOF

			# Get the upstream release info
			lsb_dist=$(lsb_release -a -u 2>&1 | tr '[:upper:]' '[:lower:]' | grep -E 'id' | cut -d ':' -f 2 | tr -d '[:space:]')
			dist_version=$(lsb_release -a -u 2>&1 | tr '[:upper:]' '[:lower:]' | grep -E 'codename' | cut -d ':' -f 2 | tr -d '[:space:]')

			# Print info about upstream distro
			cat <<-EOF
			Upstream release is '$lsb_dist' version '$dist_version'.
			EOF
		else
			if [ -r /etc/debian_version ] && [ "$lsb_dist" != "ubuntu" ] && [ "$lsb_dist" != "raspbian" ]; then
				if [ "$lsb_dist" = "osmc" ]; then
					# OSMC runs Raspbian
					lsb_dist=raspbian
				else
					# We're Debian and don't even know it!
					lsb_dist=debian
				fi
				dist_version="$(sed 's/\/.*//' /etc/debian_version | sed 's/\..*//')"
				case "$dist_version" in
					13)
						dist_version="trixie"
					;;
					12)
						dist_version="bookworm"
					;;
					11)
						dist_version="bullseye"
					;;
					10)
						dist_version="buster"
					;;
					9)
						dist_version="stretch"
					;;
					8)
						dist_version="jessie"
					;;
				esac
			fi
		fi
	fi
}

do_install() {
	echo "# Executing docker install script, commit: $SCRIPT_COMMIT_SHA"

	if command_exists docker; then
		cat >&2 <<-'EOF'
			Warning: the "docker" command appears to already exist on this system.

			If you already have Docker installed, this script can cause trouble, which is
			why we're displaying this warning and provide the opportunity to cancel the
			installation.

			If you installed the current Docker package using this script and are using it
			again to update Docker, you can ignore this message, but be aware that the
			script resets any custom changes in the deb and rpm repo configuration
			files to match the parameters passed to the script.

			You may press Ctrl+C now to abort this script.
		EOF
		( set -x; sleep 20 )
	fi

	user="$(id -un 2>/dev/null || true)"

	sh_c='sh -c'
	if [ "$user" != 'root' ]; then
		if command_exists sudo; then
			sh_c='sudo -E sh -c'
		elif command_exists su; then
			sh_c='su -c'
		else
			cat >&2 <<-'EOF'
			Error: this installer needs the ability to run commands as root.
			We are unable to find either "sudo" or "su" available to make this happen.
			EOF
			exit 1
		fi
	fi

	if is_dry_run; then
		sh_c="echo"
	fi

	# perform some very rudimentary platform detection
	lsb_dist=$( get_distribution )
	lsb_dist="$(echo "$lsb_dist" | tr '[:upper:]' '[:lower:]')"

	if is_wsl; then
		echo
		echo "WSL DETECTED: We recommend using Docker Desktop for Windows."
		echo "Please get Docker Desktop from https://www.docker.com/products/docker-desktop/"
		echo
		cat >&2 <<-'EOF'

			You may press Ctrl+C now to abort this script.
		EOF
		( set -x; sleep 20 )
	fi

	case "$lsb_dist" in

		ubuntu)
			if command_exists lsb_release; then
				dist_version="$(lsb_release --codename | cut -f2)"
			fi
			if [ -z "$dist_version" ] && [ -r /etc/lsb-release ]; then
				dist_version="$(. /etc/lsb-release && echo "$DISTRIB_CODENAME")"
			fi
		;;

		debian|raspbian)
			dist_version="$(sed 's/\/.*//' /etc/debian_version | sed 's/\..*//')"
			case "$dist_version" in
				13)
					dist_version="trixie"
				;;
				12)
					dist_version="bookworm"
				;;
				11)
					dist_version="bullseye"
				;;
				10)
					dist_version="buster"
				;;
				9)
					dist_version="stretch"
				;;
				8)
					dist_version="jessie"
				;;
			esac
		;;

		centos|rhel)
			if [ -z "$dist_version" ] && [ -r /etc/os-release ]; then
				dist_version="$(. /etc/os-release && echo "$VERSION_ID")"
			fi
		;;

		*)
			if command_exists lsb_release; then
				dist_version="$(lsb_release --release | cut -f2)"
			fi
			if [ -z "$dist_version" ] && [ -r /etc/os-release ]; then
				dist_version="$(. /etc/os-release && echo "$VERSION_ID")"
			fi
		;;

	esac

	# Check if this is a forked Linux distro
	check_forked

	# Print deprecation warnings for distro versions that recently reached EOL,
	# but may still be commonly used (especially LTS versions).
	case "$lsb_dist.$dist_version" in
		centos.8|centos.7|rhel.7)
			deprecation_notice "$lsb_dist" "$dist_version"
			;;
		debian.buster|debian.stretch|debian.jessie)
			deprecation_notice "$lsb_dist" "$dist_version"
			;;
		raspbian.buster|raspbian.stretch|raspbian.jessie)
			deprecation_notice "$lsb_dist" "$dist_version"
			;;
		ubuntu.bionic|ubuntu.xenial|ubuntu.trusty)
			deprecation_notice "$lsb_dist" "$dist_version"
			;;
		ubuntu.mantic|ubuntu.lunar|ubuntu.kinetic|ubuntu.impish|ubuntu.hirsute|ubuntu.groovy|ubuntu.eoan|ubuntu.disco|ubuntu.cosmic)
			deprecation_notice "$lsb_dist" "$dist_version"
			;;
		fedora.*)
			if [ "$dist_version" -lt 40 ]; then
				deprecation_notice "$lsb_dist" "$dist_version"
			fi
			;;
	esac

	# Run setup for each distro accordingly
	case "$lsb_dist" in
		ubuntu|debian|raspbian)
			pre_reqs="ca-certificates curl"
			apt_repo="deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] $DOWNLOAD_URL/linux/$lsb_dist $dist_version $CHANNEL"
			(
				if ! is_dry_run; then
					set -x
				fi
				$sh_c 'apt-get -qq update >/dev/null'
				$sh_c "DEBIAN_FRONTEND=noninteractive apt-get -y -qq install $pre_reqs >/dev/null"
				$sh_c 'install -m 0755 -d /etc/apt/keyrings'
				$sh_c "curl -fsSL \"$DOWNLOAD_URL/linux/$lsb_dist/gpg\" -o /etc/apt/keyrings/docker.asc"
				$sh_c "chmod a+r /etc/apt/keyrings/docker.asc"
				$sh_c "echo \"$apt_repo\" > /etc/apt/sources.list.d/docker.list"
				$sh_c 'apt-get -qq update >/dev/null'
			)
			pkg_version=""
			if [ -n "$VERSION" ]; then
				if is_dry_run; then
					echo "# WARNING: VERSION pinning is not supported in DRY_RUN"
				else
					# Will work for incomplete versions IE (17.12), but may not actually grab the "latest" if in the test channel
					pkg_pattern="$(echo "$VERSION" | sed 's/-ce-/~ce~.*/g' | sed 's/-/.*/g')"
					search_command="apt-cache madison docker-ce | grep '$pkg_pattern' | head -1 | awk '{\$1=\$1};1' | cut -d' ' -f 3"
					pkg_version="$($sh_c "$search_command")"
					echo "INFO: Searching repository for VERSION '$VERSION'"
					echo "INFO: $search_command"
					if [ -z "$pkg_version" ]; then
						echo
						echo "ERROR: '$VERSION' not found amongst apt-cache madison results"
						echo
						exit 1
					fi
					if version_gte "18.09"; then
							search_command="apt-cache madison docker-ce-cli | grep '$pkg_pattern' | head -1 | awk '{\$1=\$1};1' | cut -d' ' -f 3"
							echo "INFO: $search_command"
							cli_pkg_version="=$($sh_c "$search_command")"
					fi
					pkg_version="=$pkg_version"
				fi
			fi
			(
				pkgs="docker-ce${pkg_version%=}"
				if version_gte "18.09"; then
						# older versions didn't ship the cli and containerd as separate packages
						pkgs="$pkgs docker-ce-cli${cli_pkg_version%=} containerd.io"
				fi
				if version_gte "20.10"; then
						pkgs="$pkgs docker-compose-plugin docker-ce-rootless-extras$pkg_version"
				fi
				if version_gte "23.0"; then
						pkgs="$pkgs docker-buildx-plugin"
				fi
				if ! is_dry_run; then
					set -x
				fi
				$sh_c "DEBIAN_FRONTEND=noninteractive apt-get -y -qq install $pkgs >/dev/null"
			)
			echo_docker_as_nonroot
			exit 0
			;;
		centos|fedora|rhel)
			if [ "$(uname -m)" = "s390x" ]; then
				echo "Effective v27.5, please consult RHEL distro statement for s390x support."
				exit 1
			fi
			repo_file_url="$DOWNLOAD_URL/linux/$lsb_dist/$REPO_FILE"
			(
				if ! is_dry_run; then
					set -x
				fi
				if command_exists dnf5; then
					$sh_c "dnf -y -q --setopt=install_weak_deps=False install dnf-plugins-core"
					$sh_c "dnf5 config-manager addrepo --overwrite --save-filename=docker-ce.repo --from-repofile='$repo_file_url'"

					if [ "$CHANNEL" != "stable" ]; then
						$sh_c "dnf5 config-manager setopt \"docker-ce-*.enabled=0\""
						$sh_c "dnf5 config-manager setopt \"docker-ce-$CHANNEL.enabled=1\""
					fi
					$sh_c "dnf makecache"
				elif command_exists dnf; then
					$sh_c "dnf -y -q --setopt=install_weak_deps=False install dnf-plugins-core"
					$sh_c "rm -f /etc/yum.repos.d/docker-ce.repo  /etc/yum.repos.d/docker-ce-staging.repo"
					$sh_c "dnf config-manager --add-repo $repo_file_url"

					if [ "$CHANNEL" != "stable" ]; then
						$sh_c "dnf config-manager --set-disabled \"docker-ce-*\""
						$sh_c "dnf config-manager --set-enabled \"docker-ce-$CHANNEL\""
					fi
					$sh_c "dnf makecache"
				else
					$sh_c "yum -y -q install yum-utils"
					$sh_c "rm -f /etc/yum.repos.d/docker-ce.repo  /etc/yum.repos.d/docker-ce-staging.repo"
					$sh_c "yum-config-manager --add-repo $repo_file_url"

					if [ "$CHANNEL" != "stable" ]; then
						$sh_c "yum-config-manager --disable \"docker-ce-*\""
						$sh_c "yum-config-manager --enable \"docker-ce-$CHANNEL\""
					fi
					$sh_c "yum makecache"
				fi
			)
			pkg_version=""
			if command_exists dnf; then
				pkg_manager="dnf"
				pkg_manager_flags="-y -q --best"
			else
				pkg_manager="yum"
				pkg_manager_flags="-y -q"
			fi
			if [ -n "$VERSION" ]; then
				if is_dry_run; then
					echo "# WARNING: VERSION pinning is not supported in DRY_RUN"
				else
					if [ "$lsb_dist" = "fedora" ]; then
						pkg_suffix="fc$dist_version"
					else
						pkg_suffix="el"
					fi
					pkg_pattern="$(echo "$VERSION" | sed 's/-ce-/\\\\.ce.*/g' | sed 's/-/.*/g').*$pkg_suffix"
					search_command="$pkg_manager list --showduplicates docker-ce | grep '$pkg_pattern' | tail -1 | awk '{print \$2}'"
					pkg_version="$($sh_c "$search_command")"
					echo "INFO: Searching repository for VERSION '$VERSION'"
					echo "INFO: $search_command"
					if [ -z "$pkg_version" ]; then
						echo
						echo "ERROR: '$VERSION' not found amongst $pkg_manager list results"
						echo
						exit 1
					fi
					if version_gte "18.09"; then
						# older versions don't support a cli package
						search_command="$pkg_manager list --showduplicates docker-ce-cli | grep '$pkg_pattern' | tail -1 | awk '{print \$2}'"
						cli_pkg_version="$($sh_c "$search_command" | cut -d':' -f 2)"
					fi
					# Cut out the epoch and prefix with a '-'
					pkg_version="-$(echo "$pkg_version" | cut -d':' -f 2)"
				fi
			fi
			(
				pkgs="docker-ce$pkg_version"
				if version_gte "18.09"; then
					# older versions didn't ship the cli and containerd as separate packages
					if [ -n "$cli_pkg_version" ]; then
						pkgs="$pkgs docker-ce-cli-$cli_pkg_version containerd.io"
					else
						pkgs="$pkgs docker-ce-cli containerd.io"
					fi
				fi
				if version_gte "20.10"; then
					pkgs="$pkgs docker-compose-plugin docker-ce-rootless-extras$pkg_version"
				fi
				if version_gte "23.0"; then
						pkgs="$pkgs docker-buildx-plugin"
				fi
				if ! is_dry_run; then
					set -x
				fi
				$sh_c "$pkg_manager $pkg_manager_flags install $pkgs"
			)
			echo_docker_as_nonroot
			exit 0
			;;
		sles)
			echo "Effective v27.5, please consult SLES distro statement for s390x support."
			exit 1
			;;
		*)
			if [ -z "$lsb_dist" ]; then
				if is_darwin; then
					echo
					echo "ERROR: Unsupported operating system 'macOS'"
					echo "Please get Docker Desktop from https://www.docker.com/products/docker-desktop"
					echo
					exit 1
				fi
			fi
			echo
			echo "ERROR: Unsupported distribution '$lsb_dist'"
			echo
			exit 1
			;;
	esac
	exit 1
}

# wrapped up in a function so that we have some protection against only getting
# half the file during "curl | sh"
do_install



================================================
FILE: LICENSE
================================================
BSD 3-Clause License

Copyright (c) 2025, 1121

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.



================================================
FILE: package.json
================================================
{
  "name": "usdt-sender-app",
  "version": "1.0.0",
  "description": "A Node.js app to send USDT (ERC-20) on Ethereum with MongoDB support",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "keywords": [],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "body-parser": "^2.2.0",
    "dotenv": "^16.5.0",
    "ethers": "^5.8.0",
    "express": "^4.21.2",
    "mongoose": "^7.8.6"
  }
}



================================================
FILE: test.js
================================================
const { ethers } = require("ethers");

const amount = ethers.utils.parseUnits("1", 6);
console.log("Parsed amount:", amount.toString());



================================================
FILE: usdt_abi
================================================
// USDT_ABI.js
module.exports = [
  // Transfer function
  "function transfer(address to, uint256 amount) public returns (bool)",
];


