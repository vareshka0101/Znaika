<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('email');
            $table->string('child_name')->nullable()->after('phone');
            $table->string('child_age')->nullable()->after('child_name');
            $table->string('role')->default('parent')->after('child_age');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'child_name', 'child_age', 'role']);
        });
    }
};
